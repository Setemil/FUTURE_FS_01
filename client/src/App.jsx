import React from "react";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

export default function App() {
  // Layout positions for widgets
  const layout = [
    { i: "about", x: 0, y: 0, w: 3, h: 2 },
    { i: "projects", x: 3, y: 0, w: 6, h: 3 },
    { i: "skills", x: 0, y: 2, w: 3, h: 2 },
    { i: "contact", x: 3, y: 3, w: 3, h: 2 },
  ];

  return (
    <div className="p-4">
      <GridLayout
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={80}
        width={1200}
      >
        <div key="about" className="bg-white shadow-lg rounded-2xl p-4">
          About Me
        </div>
        <div key="projects" className="bg-white shadow-lg rounded-2xl p-4">
          Projects
        </div>
        <div key="skills" className="bg-white shadow-lg rounded-2xl p-4">
          Skills
        </div>
        <div key="contact" className="bg-white shadow-lg rounded-2xl p-4">
          Contact
        </div>
      </GridLayout>
    </div>
  );
}
