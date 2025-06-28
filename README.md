# 🏥 XMedify - React Application

A responsive, React-based web application that allows users to search for medical centers across the United States by **state** and **city**, view available listings, and book appointments. The application provides seamless user experience with persistent booking data using `localStorage`.

---

## 🚀 Features

### ✅ Landing Page
- Navigation bar with links to:
  - Find Doctors
  - Hospitals
  - Medicines
- Search bar to select **State** and **City** (via dropdowns populated from API)
- Search button to navigate to search results

### ✅ Search Results Page
- Displays list of available medical centers
- Each medical center card includes:
  - Hospital Name
  - Address
  - City, State, ZIP Code
  - Overall Rating
  - Button: **"Book FREE Center Visit"**

### ✅ Booking Interface
- Allows booking of appointment:
  - Select date within a week from current date
  - Choose from time slots (Morning, Afternoon, Evening)
- Requires user to enter email to confirm booking
- Data stored in `localStorage` using key: **`bookings`**

### ✅ My Bookings Page
- Displays all bookings made by the user
- Each booking shows:
  - Hospital name
  - Appointment date and time
  - Email used
- Accessible at route: `/my-bookings`

### ✅ Other Highlights
- Responsive UI matching Figma design
- Carousel components powered by `Swiper` library
- Clean and modular React component structure
- Accessible dropdowns and buttons for test automation

---

## 🧪 API Endpoints

- **Get All States:**
GET https://meddata-backend.onrender.com/states

markdown
Copy code

- **Get Cities of a State:**
GET https://meddata-backend.onrender.com/cities/:state

markdown
Copy code

- **Get Medical Centers:**
GET https://meddata-backend.onrender.com/data?state=<state>&city=<city>


---

## 🛠️ Tech Stack

- **React 18**
- **Tailwind CSS** for styling
- **React Router DOM** for routing
- **SwiperJS** for carousels
- **localStorage** for data persistence
- **Axios** for API calls

---

## 🧩 Figma Design

This project adheres to strict design requirements provided in the Figma file.  
🔗 **Figma Link**: https://www.figma.com/design/BLZw4DOia4hXyqt8X1Yuyl/Desktop-Designs---Healthcare-Consultation--Community-?node-id=0-1&p=f&t=IzoG5Qp2zYxQPzdB-0

---

## 📋 Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/rajashreedebnath/XMedify.git 
   cd XMedify
   ```
