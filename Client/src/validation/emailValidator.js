export function emailValidator(email) {
  const re = /\S+@\S+\.\S+/
  if (!email || email.length <= 0) return "Pleass enter a email, email can not be empty."
  if (!re.test(email)) return 'Ooops! We need a valid email address.'
  return '';
}
