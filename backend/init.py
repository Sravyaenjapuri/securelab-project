import sqlite3

# Create the database
conn = sqlite3.connect('users.db')
cursor = conn.cursor()

# # Create users table (sample schema)
# cursor.execute('''
# CREATE TABLE IF NOT EXISTS users (
#     id INTEGER PRIMARY KEY AUTOINCREMENT,
#     username TEXT UNIQUE NOT NULL,
#     password TEXT NOT NULL
# )
# ''')

# # Optional: insert sample user
# cursor.execute('''
# INSERT INTO users (username, password)
# VALUES (?, ?)
# ''', ('admin', 'admin123'))



# cursor.execute('''
# CREATE TABLE IF NOT EXISTS products (
#     id INTEGER PRIMARY KEY AUTOINCREMENT,
#     name TEXT NOT NULL,
#     category TEXT NOT NULL
# )
# ''')

# cursor.executemany('''
# INSERT INTO products (name, category) VALUES (?, ?)
# ''', [
#     ('MacBook Pro', 'laptops'),
#     ('Surface Pro', 'tablets'),
#     ('iPhone 14', 'phones'),
#     ('Galaxy S23', 'phones'),
# ])


# cursor.execute('''
# CREATE TABLE IF NOT EXISTS sql_injection (
#     id INTEGER PRIMARY KEY AUTOINCREMENT,
#     title TEXT NOT NULL,
#     subtitle TEXT NOT NULL,
#     description TEXT NOT NULL,
#     solution TEXT NOT NULL
# )
# ''')

# cursor.executemany('''
# INSERT INTO sql_injection (title, subtitle, description, solution)
# VALUES (?, ?, ?, ?)
# ''', [
#     ('LAB 1', 'Login with the admin credentials',
#      'This lab presents a login form vulnerable to SQL injection. Try using typical admin credentials or manipulate the query logic with OR-based injection to bypass authentication and trigger a successful login.',
#      'Login successful'),

#     ('LAB 2', 'Determining the number of columns',
#      'This lab focuses on UNION-based SQL injection. Your goal is to determine how many columns the original query returns by progressively using UNION  ... until the query succeeds.',
#      "' UNION SELECT NULL, NULL --"),

#     ('LAB 3', 'Retrieve data from other table ‘user’',
#      'The goal is to use UNION SQL injection to extract data from another table called \"users\" which contains username and password fields. You can do this once you know the number of columns from the previous lab.',
#      "' UNION SELECT username, password from users --"),

#     ('LAB 4', 'Get all product items that is hidden',
#      'Some product entries are hidden by design. Use a basic boolean-based SQL injection to bypass filtering conditions and retrieve all product data regardless of category or visibility.',
#      "' or 1==1--"),

#     ('LAB 5', 'SQL injection UNION attack, finding a column containing text',
#      'This lab involves determining which column in the original query can return string/text data. Once identified, you’ll inject a visible value like “iPhone” to prove success. This technique is useful when planning a full data exfiltration.',
#      "' UNION SELECT 'iPhone', NULL --")
# ])



# cursor.execute('ALTER TABLE sql_injection ADD COLUMN image TEXT')

# cursor.execute("UPDATE sql_injection SET image = ? WHERE id = ?", ('https://pentest-tools.com/blog/sql-injection-attacks', 1))
# cursor.execute("UPDATE sql_injection SET image = ? WHERE id = ?", ('https://pentest-tools.com/blog/sql-injection-attacks', 2))
# cursor.execute("UPDATE sql_injection SET image = ? WHERE id = ?", ('https://pentest-tools.com/blog/sql-injection-attacks', 3))
# cursor.execute("UPDATE sql_injection SET image = ? WHERE id = ?", ('https://pentest-tools.com/blog/sql-injection-attacks', 4))
cursor.execute("UPDATE sql_injection SET description = ? WHERE id = ?", ('', 5))
 


# cursor.executemany('''
# INSERT INTO sql_injection (title, subtitle, description, solution)
# VALUES (?, ?, ?, ?)
# ''', [
#     ('LAB 1', 'Login with the admin credentials',
#      'This lab presents a login form vulnerable to SQL injection. Try using typical admin credentials or manipulate the query logic with OR-based injection to bypass authentication and trigger a successful login.',
#      'Login successful'),

#     ('LAB 2', 'Determining the number of columns',
#      'This lab focuses on UNION-based SQL injection. Your goal is to determine how many columns the original query returns by progressively using UNION  ... until the query succeeds.',
#      "' UNION SELECT NULL, NULL --"),

#     ('LAB 3', 'Retrieve data from other table ‘user’',
#      'The goal is to use UNION SQL injection to extract data from another table called \"users\" which contains username and password fields. You can do this once you know the number of columns from the previous lab.',
#      "' UNION SELECT username, password from users --"),

#     ('LAB 4', 'Get all product items that is hidden',
#      'Some product entries are hidden by design. Use a basic boolean-based SQL injection to bypass filtering conditions and retrieve all product data regardless of category or visibility.',
#      "' or 1==1--"),

#     ('LAB 5', 'SQL injection UNION attack, finding a column containing text',
#      'This lab involves determining which column in the original query can return string/text data. Once identified, you’ll inject a visible value like “iPhone” to prove success. This technique is useful when planning a full data exfiltration.',
#      "' UNION SELECT 'iPhone', NULL --")
# ])


conn.commit()
conn.close()

print("users.db created with a sample user.")
