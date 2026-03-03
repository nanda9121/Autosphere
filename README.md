# 🚗 AutoSphere – Full-Stack Automotive Discovery Platform

AutoSphere is a production-style full-stack web application built using Flask and SQLAlchemy that enables users to explore global luxury, performance, and electric vehicles with dynamic filtering, reviews, and modern UI features.

---

## 🌍 Live Demo
(Add your deployed link here once deployed)

---

## 📌 Features

### 🔎 Dynamic Search & Filtering
- Search by brand or model
- Filter vehicles by brand
- Real-time database-driven results

### ⭐ Review & Rating System
- Submit reviews with 1–5 star ratings
- Automatic average rating calculation
- Rating breakdown visualization
- Star-based UI rendering

### 🚘 Related Vehicle Recommendations
- Displays similar cars from the same brand
- Built using relational database mapping

### 🖼️ Premium UI Features
- Image carousel gallery
- Sticky specification panel
- Smooth scroll reveal animations
- Dark mode support
- Responsive design (Mobile + Desktop)

### 🧠 Backend Architecture
- Flask-based modular routing
- SQLAlchemy ORM relational schema
- REST API endpoint (`/api/cars`)
- Secure password hashing

---

## 🏗️ Tech Stack

**Backend**
- Python
- Flask
- SQLAlchemy
- SQLite

**Frontend**
- HTML5
- Bootstrap 5
- Jinja2 Templates
- JavaScript

---

## 🗄️ Database Design

Relational schema with one-to-many relationships:

Brand → Cars  
Car → Reviews  
User → Favorites  

Designed using SQLAlchemy ORM with normalized structure.

---

## 📂 Project Structure
