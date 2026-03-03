from app import app
from models import db, Brand, Car, User
from werkzeug.security import generate_password_hash

with app.app_context():
    db.drop_all()
    db.create_all()

    # ----------- CREATE BRANDS -----------
    brands_data = [
        "Mercedes-Benz",
        "BMW",
        "Audi",
        "Porsche",
        "Lamborghini",
        "Ferrari",
        "Bentley",
        "Land Rover",
        "Volkswagen"
    ]

    brands = {}
    for name in brands_data:
        brand = Brand(name=name)
        db.session.add(brand)
        db.session.flush()
        brands[name] = brand

    # ----------- ADD CARS -----------

    cars_data = [

        # Mercedes-Benz
        ("Mercedes-Benz","C-Class C300","Luxury sport sedan with advanced tech.","2.0L Turbo I4",255,"Automatic","$46,000"),
        ("Mercedes-Benz","E-Class E350","Executive comfort and refined performance.","2.0L Turbo I4",255,"Automatic","$56,000"),
        ("Mercedes-Benz","S-Class S500","Flagship luxury sedan with cutting-edge innovation.","3.0L Inline-6 Turbo",429,"Automatic","$115,000"),
        ("Mercedes-Benz","GLC 300","Premium compact SUV.","2.0L Turbo I4",255,"Automatic","$48,000"),
        ("Mercedes-Benz","AMG C63","High-performance AMG sports sedan.","4.0L V8 Biturbo",503,"Automatic","$83,000"),
        ("Mercedes-Benz","EQS 580","All-electric luxury sedan.","Dual Electric Motor",516,"Automatic","$125,000"),

        # BMW
        ("BMW","330i","Sporty luxury sedan.","2.0L TwinPower Turbo",255,"Automatic","$44,000"),
        ("BMW","M340i","Performance-focused 3 Series.","3.0L Inline-6 Turbo",382,"Automatic","$57,000"),
        ("BMW","540i","Balanced executive sedan.","3.0L Inline-6 Turbo",335,"Automatic","$60,000"),
        ("BMW","X5 xDrive40i","Luxury midsize SUV.","3.0L Turbo I6",375,"Automatic","$65,000"),
        ("BMW","i4 M50","Electric sports sedan.","Dual Electric Motor",536,"Automatic","$69,000"),

        # Audi
        ("Audi","A4","Premium compact sedan.","2.0L Turbo I4",201,"Automatic","$41,000"),
        ("Audi","A6","Executive luxury sedan.","2.0L Turbo I4",261,"Automatic","$55,000"),
        ("Audi","Q5","Premium compact SUV.","2.0L Turbo I4",261,"Automatic","$45,000"),
        ("Audi","RS5","High-performance coupe.","2.9L V6 Biturbo",444,"Automatic","$77,000"),
        ("Audi","e-tron GT","Electric performance sedan.","Dual Electric Motor",522,"Automatic","$104,000"),

        # Porsche
        ("Porsche","911 Carrera","Iconic rear-engine sports car.","3.0L Twin-Turbo Flat-6",379,"Automatic","$114,000"),
        ("Porsche","Cayenne","Luxury performance SUV.","3.0L Turbo V6",335,"Automatic","$80,000"),
        ("Porsche","Macan","Compact luxury SUV.","2.0L Turbo I4",261,"Automatic","$57,000"),
        ("Porsche","Taycan Turbo","Electric sports sedan.","Dual Electric Motor",670,"Automatic","$153,000"),

        # Lamborghini
        ("Lamborghini","Huracan EVO","Naturally aspirated V10 supercar.","5.2L V10",631,"Automatic","$261,000"),
        ("Lamborghini","Urus","High-performance luxury SUV.","4.0L Twin-Turbo V8",657,"Automatic","$230,000"),
        ("Lamborghini","Aventador SVJ","Flagship V12 supercar.","6.5L V12",759,"Automatic","$517,000"),

        # Ferrari
        ("Ferrari","Roma","Elegant grand tourer.","3.9L Twin-Turbo V8",612,"Automatic","$247,000"),
        ("Ferrari","F8 Tributo","Mid-engine V8 supercar.","3.9L Twin-Turbo V8",710,"Automatic","$276,000"),
        ("Ferrari","SF90 Stradale","Plug-in hybrid hypercar.","4.0L Twin-Turbo V8 Hybrid",986,"Automatic","$524,000"),

        # Bentley
        ("Bentley","Continental GT","Ultra-luxury grand tourer.","4.0L Twin-Turbo V8",542,"Automatic","$235,000"),
        ("Bentley","Bentayga","Luxury SUV.","4.0L Twin-Turbo V8",542,"Automatic","$205,000"),

        # Land Rover
        ("Land Rover","Defender 110","Iconic off-road SUV.","3.0L Turbo Inline-6",395,"Automatic","$60,000"),
        ("Land Rover","Range Rover Sport","Luxury performance SUV.","3.0L Turbo Inline-6",395,"Automatic","$83,000"),
        ("Land Rover","Discovery","Premium family SUV.","3.0L Inline-6",355,"Automatic","$58,000"),

        # Volkswagen
        ("Volkswagen","Golf GTI","Hot hatch performance icon.","2.0L Turbo I4",241,"Automatic","$31,000"),
        ("Volkswagen","Arteon","Premium fastback sedan.","2.0L Turbo I4",300,"Automatic","$43,000"),
        ("Volkswagen","Tiguan","Compact family SUV.","2.0L Turbo I4",184,"Automatic","$28,000"),
    ]

    for brand_name, model, desc, engine, hp, trans, price in cars_data:
        car = Car(
            model=model,
            description=desc,
            engine=engine,
            horsepower=hp,
            mileage="Varies by market",
            transmission=trans,
            price=price,
            image="default.jpg",
            brand_id=brands[brand_name].id
        )
        db.session.add(car)

    # ----------- CREATE ADMIN USER -----------
    admin = User(
        username="admin",
        password=generate_password_hash("admin123")
    )
    db.session.add(admin)

    db.session.commit()

print("Global luxury car database seeded successfully!")