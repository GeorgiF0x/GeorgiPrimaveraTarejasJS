// Definimos la estructura del objeto persona
class Persona {
    constructor(nombre, sexo, fechaNacimiento) {
      this.nombre = nombre;
      this.sexo = sexo;
      this.fechaNacimiento = fechaNacimiento;
      // Calculamos la edad a partir de la fecha de nacimiento
      this.calcularEdad();
    }
  
    calcularEdad() {
      const fechaActual = new Date(); //segundos ahora 
      const fechaNacimiento = new Date(this.fechaNacimiento);//segundos de la fecha pasada
      const diff = fechaActual - fechaNacimiento; // hacer lo que tenga que hacer con la fecha
      this.edad = Math.floor(diff / (1000 * 60 * 60 * 24 * 365)); //pasar la diferencia de milisegundos a años
    }
  }
  
  // Creamos 4 objetos persona adultos
  const persona1 = new Persona('Juan', 'Masculino', '1999-01-15');
  const persona2 = new Persona('Ana', 'Femenino', '1994-05-22');
  const persona3 = new Persona('Luis', 'Masculino', '2002-03-10');
  const persona4 = new Persona('María', 'Femenino', '1996-11-30');
  
  // Creamos 3 objetos persona menores de edad
  const persona5 = new Persona('Carlos', 'Masculino', '2006-08-14');
  const persona6 = new Persona('Sofía', 'Femenino', '2007-12-05');
  const persona7 = new Persona('Miguel', 'Masculino', '2008-07-19');
  
  // Los metemos en un array
  const personas = [persona1, persona2, persona3, persona4, persona5, persona6, persona7];
  
  // Filtramos las personas mayores de edad
  const personasMayores = personas.filter(persona => persona.edad >= 18);
  
  // Mostramos el array de personas mayores en la consola
  console.log("Personas mayores de edad:");
  console.log(personasMayores);
  