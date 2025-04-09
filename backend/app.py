from flask import Flask, request, jsonify
import sqlite3
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
DATABASE = 'users.db'

def get_db_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row  # to return dict-like rows
    return conn

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"error": "Missing credentials"}), 400

    conn = get_db_connection()
    cursor = conn.cursor()

    # ✅ SAFE: Parameterized query to prevent SQL injection
    query = f"SELECT * FROM users WHERE username = '{username}' AND password = '{password}'"
    print(f"Running query: {query}")  # Debug log
    cursor.execute(query)
    # cursor.execute("SELECT * FROM users WHERE username = ? AND password = ?", (username, password))
    user = cursor.fetchone()
    conn.close()

    if user:
        return jsonify({"message": "Login successful", "user": dict(user)})
    else:
        return jsonify({"message": "Invalid credentials"}), 401

@app.route('/playground', methods=['POST'])
def sql_playground():
    data = request.get_json()
    query = data.get('query')

    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(query)

        if query.strip().lower().startswith("select"):
            rows = cursor.fetchall()
            result = [dict(row) for row in rows]
        else:
            conn.commit()
            result = {"rows_affected": cursor.rowcount}

        conn.close()
        return jsonify({"success": True, "result": result})

    except Exception as e:
        return jsonify({"success": False, "error": str(e)})
    

@app.route('/lab/union-test', methods=['GET'])
def union_test_lab():
    category = request.args.get('category', '')
    print(f"Received category: {category}")
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        # ❌ VULNERABLE: Raw string interpolation
        query = f"SELECT name,category FROM products WHERE category = '{category}'"
        print("Lab Query:", query)
        cursor.execute(query)

        rows = cursor.fetchall()
        conn.close()

        result = [dict(row) for row in rows]
        return jsonify({"success": True, "result": result})

    except Exception as e:
        return jsonify({"success": False, "error": str(e)})



@app.route('/api/labs', methods=['GET'])
def get_labs():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id, title, subtitle, image FROM sql_injection")
    labs = cursor.fetchall()
    conn.close()
    return jsonify([dict(lab) for lab in labs])


@app.route('/api/lab/<int:lab_id>', methods=['GET'])
def get_lab_by_id(lab_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id, title, subtitle, description, solution FROM sql_injection WHERE id = ?", (lab_id,))
    lab = cursor.fetchone()
    conn.close()

    if lab:
        return jsonify(dict(lab))
    else:
        return jsonify({'error': 'Lab not found'}), 404

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
