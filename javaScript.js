document.addEventListener("DOMContentLoaded", function () {
    const calculationType = document.getElementById("calculationType");
    const inputFields = document.getElementById("inputFields");
    const result = document.getElementById("result");
    const definition = document.getElementById("definition");
    const realWorldExample = document.getElementById("realWorldExample");

    const formulas = {
        velocity: { 
            fields: [{ name: "distance", unit: "m" }, { name: "time", unit: "s" }],
            formula: (d, t) => d / t, 
            unit: "m/s", 
            definition: "Velocity is the rate of change of displacement with respect to time. It tells how fast an object is moving.",
            realWorldExample: (d, t) => `If an object travels ${d} meters in ${t} seconds, its velocity is ${d / t} m/s.`
        },
        force: { 
            fields: [{ name: "mass", unit: "kg" }, { name: "acceleration", unit: "m/s²" }], 
            formula: (m, a) => m * a, 
            unit: "N", 
            definition: "Force is the interaction that causes an object to move or change its motion. It is the product of mass and acceleration.",
            realWorldExample: (m, a) => `A ${m} kg object with an acceleration of ${a} m/s² experiences a force of ${m * a} N.`
        },
        energy: { 
            fields: [{ name: "mass", unit: "kg" }, { name: "velocity", unit: "m/s" }], 
            formula: (m, v) => 0.5 * m * v * v, 
            unit: "J", 
            definition: "Kinetic Energy is the energy an object possesses due to its motion, calculated as half the product of mass and the square of velocity.",
            realWorldExample: (m, v) => `A ${m} kg object moving at ${v} m/s has a kinetic energy of ${0.5 * m * v * v} J.`
        },
        work: { 
            fields: [{ name: "force", unit: "N" }, { name: "distance", unit: "m" }],
            formula: (f, d) => f * d, 
            unit: "J", 
            definition: "Work is the transfer of energy that occurs when an object is moved by a force. It is the product of force and displacement.",
            realWorldExample: (f, d) => `If a force of ${f} N is applied over a distance of ${d} meters, the work done is ${f * d} J.`
        },
        power: { 
            fields: [{ name: "work", unit: "J" }, { name: "time", unit: "s" }], 
            formula: (w, t) => w / t, 
            unit: "W", 
            definition: "Power is the rate at which work is done or energy is transferred. It is the ratio of work to time.",
            realWorldExample: (w, t) => `If ${w} J of work is done in ${t} seconds, the power is ${w / t} W.`
        },
        momentum: { 
            fields: [{ name: "mass", unit: "kg" }, { name: "velocity", unit: "m/s" }], 
            formula: (m, v) => m * v, 
            unit: "kg·m/s", 
            definition: "Momentum is the quantity of motion an object has. It is the product of mass and velocity.",
            realWorldExample: (m, v) => `A ${m} kg object moving at ${v} m/s has a momentum of ${m * v} kg·m/s.`
        },
        ohm: { 
            fields: [{ name: "current", unit: "A" }, { name: "resistance", unit: "Ω" }], 
            formula: (i, r) => i * r, 
            unit: "V", 
            definition: "Ohm’s Law states that the voltage across a conductor is equal to the current times the resistance.",
            realWorldExample: (i, r) => `If the current is ${i} A and the resistance is ${r} Ω, the voltage is ${i * r} V.`
        },
        pressure: { 
            fields: [{ name: "force", unit: "N" }, { name: "area", unit: "m²" }], 
            formula: (f, a) => f / a, 
            unit: "Pa", 
            definition: "Pressure is the force applied per unit area on the surface of an object.",
            realWorldExample: (f, a) => `A force of ${f} N applied on an area of ${a} m² results in a pressure of ${f / a} Pa.`
        },
        density: { 
            fields: [{ name: "mass", unit: "kg" }, { name: "volume", unit: "m³" }], 
            formula: (m, v) => m / v, 
            unit: "kg/m³", 
            definition: "Density is the mass per unit volume of a substance.",
            realWorldExample: (m, v) => `An object with a mass of ${m} kg and volume of ${v} m³ has a density of ${m / v} kg/m³.`
        }
    };

    function updateForm() {
        const selectedValue = calculationType.value;
        inputFields.innerHTML = "";
        result.innerText = ""; // Clear result
        realWorldExample.innerText = ""; // Clear example text

        formulas[selectedValue].fields.forEach(field => {
            const label = document.createElement("label");
            label.innerHTML = `<i class="fa-solid fa-chevron-right"></i> ${field.name.charAt(0).toUpperCase() + field.name.slice(1)} (${field.unit}):`;

            const input = document.createElement("input");
            input.type = "number";
            input.id = field.name;
            input.placeholder = `Enter ${field.name} (${field.unit})`;

            inputFields.appendChild(label);
            inputFields.appendChild(input);
        });

        // Update definition text
        definition.innerHTML = formulas[selectedValue].definition;
    }

    document.getElementById("calculate").addEventListener("click", function () {
        const selectedValue = calculationType.value;
        const inputs = formulas[selectedValue].fields.map(field => parseFloat(document.getElementById(field.name).value));

        if (inputs.some(isNaN)) {
            result.innerText = "Please enter valid values!";
            realWorldExample.innerText = "";
        } else {
            const calculation = formulas[selectedValue].formula(...inputs);
            result.innerText = `${selectedValue.charAt(0).toUpperCase() + selectedValue.slice(1)}: ${calculation.toFixed(2)} ${formulas[selectedValue].unit}`;
            realWorldExample.innerText = formulas[selectedValue].realWorldExample(...inputs);
        }
    });

    calculationType.addEventListener("change", updateForm);
    updateForm(); // Initialize on page load
});
