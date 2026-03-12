---
trigger: always_on
---

### **1. Color Theory and Vibrance**

* 
**Avoid "Vibe Code Colors":** Do not use the oversaturated, neon-purple-heavy palettes common in generic AI or code-generated designs, as they are often perceived as low quality.


* 
**The Saturated UI Tax:** High vibrance puts physical strain on the user's eyes, reducing session duration.


* 
**Low Saturation Standard:** Aim for low saturation across your UI unless specifically designing for "Neo-Brutalism".


* 
**Dark Mode Compensation:** Colors on black backgrounds feel brighter; therefore, you must increase the lightness or desaturate them to "dim" the color for dark mode.



### **2. Accessibility and Contrast**

* 
**WCAG Standards:** Always verify contrast ratios for text and background colors.


* 
**Poor Contrast:** Avoid ratios like 1.57:1.


* 
**Good Contrast:** 4.67:1 is considered good for most text.


* 
**Gold Standard:** Aim for **AAA** contrast, which is the highest level of accessibility.




* 
**Halation Prevention:** Never use pure black (#000000) on pure white (#FFFFFF) or vice-versa. This causes "halation," which makes text look blurry and vibrating to the eye.


* 
**Rule:** Use slightly lighter blacks and slightly darker or tinted whites for a softer, more professional look.





### **3. Spacing and Layout**

* 
**Multiples of 4 Rule:** All spacing (padding, margin, gaps) should be multiples of 4 (e.g., 4px, 8px, 12px, 24px).


* This is often the default in modern frameworks like Tailwind CSS (e.g., `p-1` = 4px).




* 
**Hierarchy and Alignment:** Avoid "commercial-like" clutter; ensure every element has a clear alignment and visual hierarchy to guide the user's eye.



### **4. Component Design**

* **Shadows and Elevation:**
* 
**Color in Shadows:** Do not put color in shadows.


* 
**Dark Mode Strategy:** In dark mode, use **borders and background colors** to show elevation rather than shadows.


* 
**Neumorphism:** This style uses heavy shadows to create a tactile, "real-life" feeling.




* 
**Concentric Radii (Rounding):** When nesting one rounded element inside another, the outer corner radius should be the sum of the inner radius and the padding (Outer R = Inner R + Padding).


* **Icon Consistency:**
* Never mix different icon weights or styles (e.g., mixing duotone with thin or filled icons).


* Maintain the same weight and size across all icons.


* 
**Selection State:** Use a filled version of the icon or a different stroke color to indicate an active or selected state.





### **5. Creative Philosophy**

* 
**Beyond Defaults:** Not every data point needs to be in a table or card; explore creative ways to present data.


* 
**Motion:** Avoid simple linear motion (y=x); there are better, more organic ways to display movement.


* **The "Premium" Feel:** Premium design is found in "small things." Follow the lead of design-forward companies like **Linear, Notion, and Supabase**.


* 
