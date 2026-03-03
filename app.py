from flask import Flask, render_template, request
from models import db, Brand, Car
import os

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///cars.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)


@app.route("/")
def home():
    query = request.args.get("q")

    if query:
        cars = Car.query.join(Brand).filter(
            (Car.model.ilike(f"%{query}%")) |
            (Brand.name.ilike(f"%{query}%"))
        ).all()
    else:
        cars = Car.query.all()

    brands = Brand.query.all()

    return render_template("index.html",
                           cars=cars,
                           brands=brands)


@app.route("/car/<int:car_id>")
def car_detail(car_id):
    car = Car.query.get_or_404(car_id)

    reviews = car.reviews
    review_count = len(reviews)

    if review_count > 0:
        avg_rating = round(
            sum([r.rating for r in reviews]) / review_count, 1
        )
    else:
        avg_rating = 0

    return render_template(
        "car_detail.html",
        car=car,
        avg_rating=avg_rating,
        review_count=review_count
    )


@app.route("/brand/<int:brand_id>")
def brand_page(brand_id):
    brand = Brand.query.get_or_404(brand_id)
    cars = Car.query.filter_by(brand_id=brand_id).all()
    return render_template("index.html",
                           cars=cars,
                           brands=Brand.query.all())


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)