import { useState } from "react";

export default function ExpenseForm({ setData }) {
  const [form, setForm] = useState({
    income: "",
    targetSavingsPercent: "",
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

    const normalize = (value) => Math.max(Number(value) || 0, 0);

    setData({
      income: normalize(form.income),
      targetSavingsPercent: normalize(form.targetSavingsPercent),
      rent: normalize(form.rent),
      food: normalize(form.food),
      travel: normalize(form.travel),
    });
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <label>
        Monthly Income
        <input
          type="number"
          min="0"
          name="income"
          placeholder="0"
          value={form.income}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Target Savings %
        <input
          type="number"
          min="0"
          max="100"
          name="targetSavingsPercent"
          placeholder="20"
          value={form.targetSavingsPercent}
          onChange={handleChange}
          required
        />
      </label>

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
