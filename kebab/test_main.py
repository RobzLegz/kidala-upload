from fastapi.testclient import TestClient
import os

from kebab.main import app

client = TestClient(app)

TEST_TOKEN = os.environ['TEST_TOKEN']

def test_read_main():
    response = client.get("/admin/me", headers={'Authorization': f'Bearer {TEST_TOKEN}'})