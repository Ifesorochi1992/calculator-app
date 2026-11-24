
const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

buttons.forEach(button => {
    button.addEventListener("click", () => {

        const value = button.dataset.value;
        const action = button.dataset.action;

        if (action === "clear") {
            display.value = "";
        }

        else if (action === "delete") {
            display.value = display.value.slice(0, -1);
        }

        else if (action === "percent") {
            if (display.value !== "") {
                try {
                    const result = calculate(display.value);
                    display.value = String(result / 100);
                } catch {
                    display.value = "Error";
                }
            }
        }

        else if (action === "calculate") {
            try {
                display.value = String(calculate(display.value));
            } catch {
                display.value = "Error";
            }
        }

        else if (value) {
            if (display.value === "Error") {
                display.value = "";
            }

            display.value += value;
        }
    });
});

// Safely calculate mathematical expressions
function calculate(expression) {
    if (!/^[0-9+\-*/.()\s]+$/.test(expression)) {
        throw new Error("Invalid expression");
    }

    const result = Function('"use strict"; return (' + expression + ')')();

    if (!Number.isFinite(result)) {
        throw new Error("Invalid calculation");
    }

    return Number.parseFloat(result.toPrecision(12));
}
