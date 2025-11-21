function probarLogica() {
  console.clear();
  console.log("--- INICIANDO PRUEBAS DE JS ---");

  // 1. Ejemplo de SWITCH
  // Simula la prioridad de una tarea
  let prioridad = "Alta";

  console.log("Probando Switch con prioridad: " + prioridad);

  switch (prioridad) {
    case "Alta":
      console.log("🔴 ¡Atención! Tarea urgente.");
      break;
    case "Media":
      console.log("🟡 Tarea normal.");
      break;
    case "Baja":
      console.log("🟢 Se puede hacer después.");
      break;
    default:
      console.log("⚪ Prioridad no definida.");
  }

  // 2. Ejemplo de FOR LOOP con CONTINUE
  // Sumar números del 1 al 10, pero IGNORAR el 6.
  console.log("\nProbando For Loop (Saltando el 6):");

  let suma = 0;

  for (let i = 1; i <= 10; i++) {
    // Si i es 6, "continue" salta esta iteración y no ejecuta lo de abajo
    if (i === 6) {
      console.log("Skipping (Saltando) el número: " + i);
      continue;
    }

    suma += i; // Sumamos el número
    console.log("Sumando: " + i + " | Total parcial: " + suma);
  }

  console.log("✅ Suma Final: " + suma);
  alert(
    "Revisa la consola del navegador para ver los resultados del Switch y el For Loop."
  );
}
