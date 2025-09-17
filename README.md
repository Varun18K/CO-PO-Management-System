CO-PO Management System is a web-based application designed for engineering colleges to efficiently manage Course Outcomes (COs) and Program Outcomes (POs). It helps faculty map COs to POs, monitor attainment levels, and generate reports to evaluate academic performance. The system provides a clear, interactive dashboard for quick insights, making the assessment process structured and user-friendly.

The platform allows users to manage Courses, Course Outcomes, and Program Outcomes, and map COs to POs with weightage levels (Low, Medium, High). Faculty can also assign assessment tools to COs, ensuring effective measurement of student learning outcomes. Interactive charts and reports visualize the attainment data, enabling quick identification of strong and weak areas in the curriculum. Additionally, the system allows exporting PO attainment data as CSV for offline analysis.

With a clean and intuitive interface, this application streamlines the CO-PO mapping and evaluation process, saving time for faculty and helping department heads monitor overall program performance. Its responsive dashboard, professional charts, and export functionality make it a comprehensive solution for academic assessment management.


User Interface :

1. Dashboard Page
   
<img width="1890" height="916" alt="image" src="https://github.com/user-attachments/assets/5bf5677f-3a0c-478b-97a9-c0a2c5cdee6c" />


2. Courses Page
   
<img width="1897" height="909" alt="image" src="https://github.com/user-attachments/assets/6b2d87fe-0d90-4955-a103-555c7958feeb" />


3. Course Outcomes Page

<img width="1892" height="915" alt="image" src="https://github.com/user-attachments/assets/d54d0e65-88bf-4d8a-8665-4cc6684a350c" />
<img width="1876" height="893" alt="image" src="https://github.com/user-attachments/assets/a44b6527-181b-421d-8db5-b0978c0ecf8d" />

4. Program Outcomes Page

<img width="1901" height="896" alt="image" src="https://github.com/user-attachments/assets/22e3140b-bfc2-40fe-9bc4-a53dbbeda4f2" />


5. CO-PO Mapping Page

<img width="1888" height="901" alt="image" src="https://github.com/user-attachments/assets/91a94a13-4589-4e17-a57a-1a796c296f88" />


6. Reports Page 

<img width="1879" height="889" alt="image" src="https://github.com/user-attachments/assets/97ace503-eb38-4e5d-9a15-916d1fba87f2" />


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
