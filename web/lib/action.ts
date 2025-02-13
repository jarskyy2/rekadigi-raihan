export async function getCustomer() {
    try {
        const res = await fetch("http://localhost:8000/api/customers-with-detail");
        return res.json();
    } catch (error) {
        console.log(error);
    }
}

export async function createCustomer(name: string) {
    try{
        const res = await fetch("http://localhost:8000/api/customers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name }),
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
}