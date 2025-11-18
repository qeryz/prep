
# Simple dictionary
students = {
    "Hermione": "Gryffindor",
    "Ron": "Gryffindor",
    "Harry": "Gryffindor",
    "Draco": "Slytherin",
}

for student in students:
    print(student, students[student], sep=", ")


# List of dictionaries
students_complex = [
    {"name": "Hermione", "house": "Gryffindor", "patronus": "Otter"},
    {"name": "Ron", "house": "Gryffindor", "patronus": "Stag"},
    {"name": "Harry", "house": "Gryffindor", "patronus": "Jack Russell terrier"},
    {"name": "Draco", "house": "Slytherin", "patronus": "None"},
]

for student in students_complex:
    print(student["name"], student["house"], student["patronus"], sep=", ")