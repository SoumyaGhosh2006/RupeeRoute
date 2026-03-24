const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const toMoney = (value) => Math.round((Number(value) || 0) * 100) / 100;

export function getHealthBand(score) {
  if (score >= 80) return "Excellent";
  if (score >= 60) return "Good";
  return "Needs Attention";
}

export function getHealthRecommendation(score) {
  if (score >= 80) {
    return "Your habits are strong. Keep this consistency and review goals monthly.";
  }

  if (score >= 60) {
    return "You're in a healthy zone. Tighten your largest expense category for faster progress.";
  }

  return "Focus on reducing top expenses and improving savings rate this month.";
}

export function calculateFinanceMetrics(input) {
  const income = Math.max(Number(input?.income) || 0, 0);
  const targetSavingsPercent = Math.max(Number(input?.targetSavingsPercent) || 0, 0);
  const rent = Math.max(Number(input?.rent) || 0, 0);
  const food = Math.max(Number(input?.food) || 0, 0);
  const travel = Math.max(Number(input?.travel) || 0, 0);

  const totalExpense = toMoney(rent + food + travel);
  const actualSavings = toMoney(income - totalExpense);
  const actualSavingsRate = income > 0 ? toMoney((actualSavings / income) * 100) : 0;
  const targetSavingsAmount = toMoney(income * (targetSavingsPercent / 100));
  const targetGap = toMoney(actualSavings - targetSavingsAmount);
  const meetsTarget = actualSavings >= targetSavingsAmount;

  const maxCategorySpend = Math.max(rent, food, travel);
  const maxCategoryShare = totalExpense > 0 ? (maxCategorySpend / totalExpense) * 100 : 0;

  const savingsRateScore = clamp((actualSavingsRate / 40) * 100, 0, 100);
  const expenseLoadScore = income > 0 ? clamp((1 - totalExpense / income) * 100, 0, 100) : 0;
  const diversificationScore =
    totalExpense > 0 ? clamp(100 - (maxCategoryShare - 50) * 2, 0, 100) : 100;

  const score = Math.round(
    0.5 * savingsRateScore + 0.3 * expenseLoadScore + 0.2 * diversificationScore,
  );
  const healthScore = clamp(score, 0, 100);

  const categoryValues = { rent, food, travel };
  const highestSpending = Object.entries(categoryValues).reduce((prev, curr) =>
    prev[1] >= curr[1] ? prev : curr,
  )[0];

  return {
    income,
    targetSavingsPercent,
    rent,
    food,
    travel,
    totalExpense,
    actualSavings,
    actualSavingsRate,
    targetSavingsAmount,
    targetGap,
    meetsTarget,
    score: healthScore,
    band: getHealthBand(healthScore),
    recommendation: getHealthRecommendation(healthScore),
    highestSpending,
    savingsRateScore: Math.round(savingsRateScore),
    expenseLoadScore: Math.round(expenseLoadScore),
    diversificationScore: Math.round(diversificationScore),
  };
}
