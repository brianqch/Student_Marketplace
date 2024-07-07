import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function NewItem() {
    const [form, setForm] = useState({
        item_title: "",
        item_price: "",
        item_category: "",
        item_condition: "",
        item_description: ""
    });
    const [isNew, setIsNew] = useState(true);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            const id = params.id?.toString() || undefined;
            if (!id) return;
            setIsNew(false);
            const response = await fetch(
                `http://localhost:5050/item/${params.id.toString()}`
            );
            if (!response.ok) {
                const message = `An error has occurred: ${response.statusText}`;
                console.error(message);
                return;
            }
            const item = await response.json();
            if (!item) {
                console.warn(`item with id ${id} not found`);
                navigate("/");
                return;
            }
            setForm(item);
        }
        fetchData();
        return;
    }, [params.id, navigate]);

    // These methods will update the state properties.
    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    // This function will handle the submission.
    async function onSubmit(e) {
        e.preventDefault();
        const new_item = { ...form };
        console.log(JSON.stringify(new_item));
        try {
            let response;
            if (isNew) {
                // if we are adding a new item we will POST to /item.
                response = await fetch("http://localhost:5050/item", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(new_item),
                });

                console.log(response.body);
            } else {
                // if we are updating a item we will PATCH to /item/:id.
                response = await fetch(`http://localhost:5050/item/${params.id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(new_item),
                });
            }

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            console.error('A problem occurred with your fetch operation: ', error);
        } finally {
            setForm({
                item_title: "",
                item_price: "",
                item_category: "",
                item_condition: "",
                item_description: ""
            });
            navigate("/");
        }
    }

    // This following section will display the form that takes the input from the user.
    return (
        <>
            <h3 className="text-lg font-semibold p-4">Create New Item Listing</h3>
            <form
                onSubmit={onSubmit}
                className="border rounded-lg overflow-hidden p-4"
            >
                <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-slate-900/10 pb-12 md:grid-cols-2">
                    <div>
                        <h2 className="text-base font-semibold leading-7 text-slate-900">
                            Item Info
                        </h2>
                        <p className="mt-1 text-sm leading-6 text-slate-600">
                            This information will be displayed to help the public know about the item.
                        </p>
                    </div>

                    <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 ">
                        <div className="sm:col-span-4">
                            <label
                                htmlFor="item_title"
                                className="block text-sm font-medium leading-6 text-slate-900"
                            >
                                Title
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                        type="text"
                                        name="item_title"
                                        id="item_title"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="Title"
                                        value={form.item_title}
                                        onChange={(e) => updateForm({ item_title: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="sm:col-span-4">
                            <label
                                htmlFor="item_price"
                                className="block text-sm font-medium leading-6 text-slate-900"
                            >
                                Price
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                        type="text"
                                        name="item_price"
                                        id="item_price"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="Price"
                                        value={form.item_price}
                                        onChange={(e) => updateForm({ item_price: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="sm:col-span-4">
                            <label
                                htmlFor="item_category"
                                className="block text-sm font-medium leading-6 text-slate-900"
                            >
                                Category
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                        type="text"
                                        name="item_category"
                                        id="item_category"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="Category"
                                        value={form.item_category}
                                        onChange={(e) => updateForm({ item_category: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            <label
                                    htmlFor="item_condition"
                                    className="block text-sm font-medium leading-6 text-slate-900"
                                >
                                Condition
                            </label>
                            <fieldset className="mt-4">
                                <legend className="sr-only">Condition</legend>
                                <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                                    <div className="flex items-center">
                                        <input
                                            id="item_condition_new"
                                            name="conditions"
                                            type="radio"
                                            value="New"
                                            className="h-4 w-4 border-slate-300 text-slate-600 focus:ring-slate-600 cursor-pointer"
                                            checked={form.item_condition === "New"}
                                            onChange={(e) => updateForm({ item_condition: e.target.value })}
                                        />
                                        <label
                                            htmlFor="condition_new"
                                            className="ml-3 block text-sm font-medium leading-6 text-slate-900 mr-4"
                                        >
                                            New
                                        </label>
                                        <input
                                            id="item_condition_used_like_new"
                                            name="conditions"
                                            type="radio"
                                            value="Used - Like New"
                                            className="h-4 w-4 border-slate-300 text-slate-600 focus:ring-slate-600 cursor-pointer"
                                            checked={form.item_condition === "Used - Like New"}
                                            onChange={(e) => updateForm({ item_condition: e.target.value })}
                                        />
                                        <label
                                            htmlFor="condition_used_like_new"
                                            className="ml-3 block text-sm font-medium leading-6 text-slate-900 mr-4"
                                        >
                                            Used - Like New
                                        </label>
                                        <input
                                            id="item_condition_used_good"
                                            name="conditions"
                                            type="radio"
                                            value="Used - Good"
                                            className="h-4 w-4 border-slate-300 text-slate-600 focus:ring-slate-600 cursor-pointer"
                                            checked={form.item_condition === "Used - Good"}
                                            onChange={(e) => updateForm({ item_condition: e.target.value })}
                                        />
                                        <label
                                            htmlFor="condition_used_good"
                                            className="ml-3 block text-sm font-medium leading-6 text-slate-900 mr-4"
                                        >
                                            Used - Good
                                        </label>
                                        <input
                                            id="item_condition_used_fair"
                                            name="conditions"
                                            type="radio"
                                            value="Used - Fair"
                                            className="h-4 w-4 border-slate-300 text-slate-600 focus:ring-slate-600 cursor-pointer"
                                            checked={form.item_condition === "Used - Fair"}
                                            onChange={(e) => updateForm({ item_condition: e.target.value })}
                                        />
                                        <label
                                            htmlFor="condition_used_fair"
                                            className="ml-3 block text-sm font-medium leading-6 text-slate-900 mr-4"
                                        >
                                            Used - Fair
                                        </label>
                                    </div>
                                </div>
                            </fieldset>
                        </div>

                        <div className="sm:col-span-4">
                            <label
                                htmlFor="item_description"
                                className="block text-sm font-medium leading-6 text-slate-900"
                            >
                                Description
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                        type="text"
                                        name="item_description"
                                        id="item_description"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="Description"
                                        value={form.item_description}
                                        onChange={(e) => updateForm({ item_description: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <input
                    type="submit"
                    value="Submit"
                    className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3 cursor-pointer mt-4"
                />
            </form>
        </>
    );
}