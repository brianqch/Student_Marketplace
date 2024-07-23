"use client"; // Mark this as a client component
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import supabase from '../../../lib/supabase';

const EditItem = ({ params }) => {
  const [form, setForm] = useState({
    item_title: "",
    item_price: "",
    item_location: "",
    item_category: "",
    item_condition: "",
    item_description: ""
  });
  const [isNew, setIsNew] = useState(false);
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    async function fetchData() {
      if (id) {
        const { data: item, error } = await supabase
          .from('items')
          .select('*')
          .eq('id', id)
          .single();
        
        if (error) {
          console.error('Error fetching item:', error);
          router.push("/"); // Redirect to home or error page
          return;
        }
        setForm(item);
        setIsNew(false);
      } else {
        // Handle case when id is null or undefined
        console.log('ID is null or undefined');
        setIsNew(true);
      }
    }
    fetchData();
  }, [id, router]);

  function updateForm(value) {
    setForm(prev => ({ ...prev, ...value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    const updatedItem = { ...form };

    try {
      const { error } = await supabase
        .from('items')
        .update(updatedItem)
        .eq('id', id);

      if (error) {
        throw error;
      }
      router.push("/"); // Redirect to home or another page after submission
    } catch (error) {
      console.error('A problem occurred with your Supabase operation:', error.message);
    }
  }

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
                            htmlFor="item_location"
                            className="block text-sm font-medium leading-6 text-slate-900"
                        >
                            Location
                        </label>
                        <div className="mt-2">
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                <input
                                    type="text"
                                    name="item_location"
                                    id="item_location"
                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    placeholder="Location"
                                    value={form.item_location}
                                    onChange={(e) => updateForm({ item_location: e.target.value })}
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

export default EditItem;
