"use client";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import supabase from "../lib/supabase";

const Item = (props) => {
  const router = useRouter();

  return (
    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
      <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
        {props.item.title}
      </td>
      <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
        {props.item.price}
      </td>
      <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
        {props.item.location}
      </td>
      <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
        {props.item.category}
      </td>
      <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
        {props.item.condition}
      </td>
      <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
        {props.item.description}
      </td>
      <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
        {props.item.brand}
      </td>
      <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
        <div className="flex gap-2">
          <button
            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3"
            onClick={() => router.push(`/items/edit/${props.item.id}`)}
          >
            Edit
          </button>
          <button
          className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3"
          color="red"
          type="button"
          onClick={() => {
            props.deleteItem(props.item.id);
          }}
        >
          Delete
        </button>
        </div>
      </td>
    </tr>
  );
};

export default function ItemList() {
  const [items, setItems] = useState([]);

  // This method fetches the items from the database.
  useEffect(() => {
    async function getItems() {
      let { data: items, error } = await supabase
        .from('items')
        .select('*')
      if (error) {
        console.error('Error fetching items:', error);
      } else {
        setItems(items);
      }
    }
    getItems();
  }, []);

  // This method will delete a item
  async function deleteItem(id) {
    const { error } = await supabase.from('items').delete().eq('id', id);
    if (error) {

      console.error('Error deleting item:', error.message);
    } else {
      // Update state only if deletion was successful
      const newItems = items.filter((el) => el.id !== id);
      setItems(newItems);
    }
  }

  // This method will map out the items on the table
  function itemList() {
    return items.map((item) => {
      return (
        <Item
          item={item}
          deleteItem={() => deleteItem(item.id)}
          key={item.id}
        />
      );
    });
  }

  // This following section will display the table with the items of individuals.
  return (
    <>
      <h3 className="text-lg font-semibold p-4">Items</h3>
      <div className="border rounded-lg overflow-hidden">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Title
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Price
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Location
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Category
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Condition
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Description
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Brand
                </th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {itemList()}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}




