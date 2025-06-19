import socket
import time
import os
import sys

def wait_for_db(host, port, timeout=60):
    """Waits for the database connection."""
    print(f"Waiting for database at {host}:{port}...")
    start_time = time.time()
    while time.time() - start_time < timeout:
        try:
            s = socket.create_connection((host, port), timeout=1)
            s.close()
            print(f"Database at {host}:{port} is available.")
            return True
        except (socket.timeout, ConnectionRefusedError, OSError) as e:
            time.sleep(1)
    print(f"Error: Database at {host}:{port} not available after {timeout} seconds.")
    return False

if __name__ == "__main__":
    db_host = os.environ.get('DJANGO_DB_HOST', 'db')
    db_port = int(os.environ.get('DJANGO_DB_PORT', 3306))

    if not wait_for_db(db_host, db_port):
        sys.exit(1) 

    