# 🧩 ROI Calculator – Approach Documentation

## **Overview**
A lightweight ROI calculator web app that helps businesses estimate cost savings, payback period, and ROI when switching from manual to automated invoicing.  
It combines a simple input form, live simulation, scenario storage, and a downloadable report to visually demonstrate automation’s advantage.

---

## **Flow of Application**
1. User enters key business inputs (invoice volume, staff, wages, etc.) on the frontend.  
2. Frontend sends data to backend `/simulate` API.  
3. Backend applies internal constants and calculation logic to return ROI results favoring automation.  
4. User can save, load, or delete scenarios from the database.  
5. To download a report, the user must enter an email.  
6. Backend generates a PDF/HTML report with simulation results.

---

## **Approach to the Problem Statement**
- Building a **full-stack prototype** using a minimal tech stack (React + Node.js + Postgresql).  
- We Keep the **UI simple** for quick decision-making.  
- Implementing **REST APIs** for simulation, scenario CRUD, and report generation.  
- Applying **server-side bias constants** to ensure automation always shows positive ROI.  
- Enabled **report download only after email entry** for lead collection.
- Deployement in aws and vercel

---

## **Goals**
- Showing clear financial benefits of automation.  
- The webpage allows saving and comparing ROI scenarios.  
- We Guarantee positive ROI with internal bias factor.  
- The application provides lead capture through email-gated report download.  

---

## **Functionality**
- Interactive input form with live ROI simulation.  
- CRUD support for saved scenarios.  
- Report generation (PDF/HTML) after email entry.  
- Persistent local storage and also cloud database  
- REST APIs for data flow between frontend and backend.

