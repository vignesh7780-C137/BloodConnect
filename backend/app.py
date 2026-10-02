from flask import Flask, jsonify, request
from flask_cors import CORS

from database import initialize_database, get_connection


app = Flask(__name__)
CORS(app)

initialize_database()


# ---------------- HOME ----------------

@app.route("/")
def home():
    return "BloodConnect Backend is running!"


# ---------------- GET DONORS ----------------

@app.route("/api/donors", methods=["GET"])
def get_donors():

    connection = get_connection()

    donors = connection.execute(
        "SELECT * FROM donors"
    ).fetchall()

    connection.close()

    return jsonify([dict(donor) for donor in donors])


# ---------------- ADD DONOR ----------------

@app.route("/api/donors", methods=["POST"])
def add_donor():

    data = request.get_json()

    name = data.get("name")
    email = data.get("email")
    blood_group = data.get("blood_group")
    phone = data.get("phone")
    availability = data.get("availability")

    if not all([
        name,
        email,
        blood_group,
        phone,
        availability
    ]):
        return jsonify({
            "error": "All donor fields are required."
        }), 400

    connection = get_connection()

    cursor = connection.execute("""
        INSERT INTO donors
        (name, email, blood_group, phone, availability)
        VALUES (?, ?, ?, ?, ?)
    """, (
        name,
        email,
        blood_group,
        phone,
        availability
    ))

    connection.commit()

    donor_id = cursor.lastrowid

    connection.close()

    return jsonify({
        "message": "Donor added successfully.",
        "id": donor_id
    }), 201


# ---------------- DELETE DONOR ----------------

@app.route(
    "/api/donors/<int:donor_id>",
    methods=["DELETE"]
)
def delete_donor(donor_id):

    connection = get_connection()

    cursor = connection.execute(
        "DELETE FROM donors WHERE id = ?",
        (donor_id,)
    )

    connection.commit()
    connection.close()

    if cursor.rowcount == 0:

        return jsonify({
            "error": "Donor not found."
        }), 404

    return jsonify({
        "message": "Donor deleted successfully."
    })


# ---------------- UPDATE DONOR ----------------

@app.route(
    "/api/donors/<int:donor_id>",
    methods=["PUT"]
)
def update_donor(donor_id):

    data = request.get_json()

    name = data.get("name")
    email = data.get("email")
    blood_group = data.get("blood_group")
    phone = data.get("phone")
    availability = data.get("availability")

    if not all([
        name,
        email,
        blood_group,
        phone,
        availability
    ]):
        return jsonify({
            "error": "All donor fields are required."
        }), 400

    connection = get_connection()

    cursor = connection.execute("""
        UPDATE donors
        SET name = ?,
            email = ?,
            blood_group = ?,
            phone = ?,
            availability = ?
        WHERE id = ?
    """, (
        name,
        email,
        blood_group,
        phone,
        availability,
        donor_id
    ))

    connection.commit()
    connection.close()

    if cursor.rowcount == 0:

        return jsonify({
            "error": "Donor not found."
        }), 404

    return jsonify({
        "message": "Donor updated successfully."
    })


# ---------------- START SERVER ----------------

if __name__ == "__main__":
    app.run(debug=True, port=5000)