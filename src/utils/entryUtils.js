export const isNew = (logDate) => {
  const plainLogDate = Temporal.PlainDate.from(logDate);
  const elapsedTime = Temporal.Now.plainDateISO()
    .since(plainLogDate)
    .total("days");

  return elapsedTime <= 14;
};
