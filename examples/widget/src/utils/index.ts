import moment from 'moment';

export function emailIsValid(email: string) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export function toDatePickerInputString(date: Date) {
  return moment(date).format('YYYY-MM-DDTHH:mm');
}

export function confirmPrompt({
  promptMessage,
  onConfirm,
  onCancel,
}: {
  promptMessage: string;
  onConfirm: () => any;
  onCancel?: () => any;
}) {
  const confirmed = window.confirm(promptMessage);
  if (confirmed) {
    onConfirm && onConfirm();
  } else {
    onCancel && onCancel();
  }
}
