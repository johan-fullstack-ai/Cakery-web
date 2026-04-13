# Cakery Website – Frontend Project 2

This project is a bakery‑themed website built with **HTML**, **CSS**, and **JavaScript**.  
It expands on layout, styling, and interactive UI patterns while keeping the entire app client‑side.

## Features
- Dynamic product rendering (cards generated via JavaScript)
- Responsive layout using CSS Grid and Flexbox
- Modal windows for product details and cart
- Cart state stored in `localStorage`
- Event delegation for interactive UI elements
- Accessible buttons, labels, and modal behavior

## How the Three Files Work Together

### HTML (index.html)
- Provides **named elements**, `id`s, and `class` hooks  
- Contains **empty containers** for dynamic content  
- Defines **buttons**, **modals**, and structural layout  
- Example:  
  - `div id="cupcakeGrid"` exists only as a placeholder  
  - JavaScript fills it with product cards at runtime

### CSS (styles.css)
- Handles **visual design**, colors, spacing, and typography  
- Defines **responsive behavior** with Grid, Flexbox, and media queries  
- Controls **state‑based display** (e.g., modal open/close classes)  
- Uses **CSS variables** and attribute selectors for cleaner styling

### JavaScript (script.js)
- Holds the **product data** (arrays of objects)  
- Generates product cards dynamically  
- Manages **cart state** and persists it via `localStorage` (survives refresh) 
- Handles **modal logic**, button events, and UI updates  
- Uses **event delegation** for scalable interaction handling:
   After event it matches with classes for closest parent element with .closest(class) 

### Pagespeed performance
Performance 100 (around 92 on mobile), availability and best pracices 100, search engine optimization 91.

## Purpose
This project helped me practice:
- Structuring multi-section layouts  
- Working with images and assets  
- Adding simple JavaScript functionality  
- Improving CSS styling and design consistency  

## Live Demo
https://johan-fullstack-ai.github.io/Cakery-web/

## How to View
Open `index.html` in a browser, or run it through a local server if needed for JS features.

