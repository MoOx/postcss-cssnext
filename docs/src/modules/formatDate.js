const monthNames = [
  "jan.",
  "fév.",
  "mars",
  "avril",
  "mai",
  "juin",
  "juil.",
  "août",
  "sept.",
  "oct.",
  "nov.",
  "déc.",
]

export default function formatDate(date) {
  date = new Date(date)

  return [
    date.getDate(),
    monthNames[date.getMonth()],
    date.getFullYear(),
  ].join(" ")
}
