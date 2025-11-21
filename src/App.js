import React, { useState, useEffect } from "react";
import "./styles.css";

// ⚠️ IMPORTANTE: Pega aquí la URL que te dio Render (terminada en /api/)
// Ejemplo: "https://mi-proyecto-php.onrender.com/api/"
const API_URL = "https://umb-web-taller-1-pble.onrender.com/";

export default function App() {
  const [tareas, setTareas] = useState([]); // Estado para guardar las tareas
  const [nuevaTarea, setNuevaTarea] = useState(""); // Estado para el input

  // 1. READ: Cargar tareas al iniciar la app
  useEffect(() => {
    obtenerTareas();
  }, []);

  const obtenerTareas = async () => {
    try {
      const respuesta = await fetch(API_URL);
      const datos = await respuesta.json();
      setTareas(datos);
    } catch (error) {
      console.error("Error cargando tareas:", error);
    }
  };

  // 2. CREATE: Enviar nueva tarea al backend
  const agregarTarea = async (e) => {
    e.preventDefault(); // Evita que se recargue la página
    if (!nuevaTarea.trim()) return;

    try {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titulo: nuevaTarea }),
      });
      setNuevaTarea(""); // Limpiar input
      obtenerTareas(); // Recargar lista
    } catch (error) {
      console.error("Error creando tarea:", error);
    }
  };

  // 3. UPDATE: Marcar como completada/pendiente
  const toggleCompletada = async (id, estadoActual) => {
    try {
      await fetch(API_URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: id, completada: !estadoActual }),
      });
      obtenerTareas();
    } catch (error) {
      console.error("Error actualizando tarea:", error);
    }
  };

  // 4. DELETE: Eliminar tarea
  const eliminarTarea = async (id) => {
    if (!window.confirm("¿Seguro que quieres borrarla?")) return;

    try {
      // Enviamos el ID por URL (Query Param)
      await fetch(`${API_URL}?id=${id}`, {
        method: "DELETE",
      });
      obtenerTareas();
    } catch (error) {
      console.error("Error eliminando tarea:", error);
    }
  };

  return (
    <div className="App">
      <h1>Gestor de Tareas (React + PHP)</h1>

      {/* Formulario para añadir */}
      <form onSubmit={agregarTarea}>
        <input
          type="text"
          placeholder="Nueva tarea..."
          value={nuevaTarea}
          onChange={(e) => setNuevaTarea(e.target.value)}
        />
        <button type="submit">Añadir</button>
      </form>

      {/* Lista de Tareas */}
      <ul>
        {tareas.map((tarea) => (
          <li
            key={tarea.id}
            style={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            {/* Checkbox para Completar */}
            <input
              type="checkbox"
              checked={tarea.completada}
              onChange={() => toggleCompletada(tarea.id, tarea.completada)}
            />

            {/* Texto de la tarea (tachado si está completa) */}
            <span
              style={{
                textDecoration: tarea.completada ? "line-through" : "none",
              }}
            >
              {tarea.titulo}
            </span>

            {/* Botón Eliminar */}
            <button
              onClick={() => eliminarTarea(tarea.id)}
              style={{ marginLeft: "auto" }}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
