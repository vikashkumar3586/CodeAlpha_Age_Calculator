(function() {
  const form = document.getElementById('ageForm');
  const dayInput = document.getElementById('day');
  const monthInput = document.getElementById('month');
  const yearInput = document.getElementById('year');
  const dayError = document.getElementById('dayError');
  const monthError = document.getElementById('monthError');
  const yearError = document.getElementById('yearError');
  const result = document.getElementById('result');

  function clearErrors() {
    dayError.textContent = '';
    monthError.textContent = '';
    yearError.textContent = '';
    result.textContent = '';
  }

  function isValidDate(d, m, y) {
    // Months in JS are 0-indexed, so month-1
    const date = new Date(y, m - 1, d);
    return date && (date.getFullYear() === y) && (date.getMonth() === m - 1) && (date.getDate() === d);
  }

  function calculateAge(birthDate, nowDate) {
    let years = nowDate.getFullYear() - birthDate.getFullYear();
    let months = nowDate.getMonth() - birthDate.getMonth();
    let days = nowDate.getDate() - birthDate.getDate();

    if (days < 0) {
      months -= 1;
      // Get days in previous month of current date
      const prevMonth = new Date(nowDate.getFullYear(), nowDate.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }

    return { years, months, days };
  }

  form.addEventListener('submit', function(event) {
    event.preventDefault();
    clearErrors();

    const day = Number(dayInput.value);
    const month = Number(monthInput.value);
    const year = Number(yearInput.value);

    let valid = true;
    const now = new Date();
    if (!day || day < 1 || day > 31) {
      dayError.textContent = "Please enter a valid day (1-31).";
      valid = false;
    }
    if (!month || month < 1 || month > 12) {
      monthError.textContent = "Please enter a valid month (1-12).";
      valid = false;
    }
    if (!year || year < 1900 || year > now.getFullYear()) {
      yearError.textContent = `Please enter a valid year (1900-${now.getFullYear()}).`;
      valid = false;
    }

    if (valid && !isValidDate(day, month, year)) {
      dayError.textContent = "The date entered is invalid.";
      valid = false;
    }

    if (valid) {
      const birthDate = new Date(year, month -1, day);
      if (birthDate > now) {
        yearError.textContent = "Date of birth cannot be in the future.";
        valid = false;
      }
    }

    if (!valid) {
      result.textContent = '';
      return;
    }

    const birthDate = new Date(year, month -1, day);
    const age = calculateAge(birthDate, now);

    result.textContent = `You are ${age.years} year${age.years !== 1 ? 's' : ''}, ${age.months} month${age.months !== 1 ? 's' : ''}, and ${age.days} day${age.days !== 1 ? 's' : ''} old.`;
  });
})();
