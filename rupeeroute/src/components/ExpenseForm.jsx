import { useState } from "react";

export default function ExpenseForm({ setData }) {
  const [form, setForm] = useState({
    rent: "",
    food: "",
    travel: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setData({
      rent: Number(form.rent) || 0,
      food: Number(form.food) || 0,
      travel: Number(form.travel) || 0,
    });
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <label>
        Rent
        <input
          type="number"
          min="0"
          name="rent"
          placeholder="0"
          value={form.rent}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Food
        <input
          type="number"
          min="0"
          name="food"
          placeholder="0"
          value={form.food}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Travel
        <input
          type="number"
          min="0"
          name="travel"
          placeholder="0"
          value={form.travel}
          onChange={handleChange}
          required
        />
      </label>

      <button type="submit">Analyze</button>
    </form>
  );
}
