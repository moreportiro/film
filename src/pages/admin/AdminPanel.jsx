import { MovieForm } from "./MovieForm";

export function AdminPanel({ onSuccess }) {
  const handleFormSubmit = async (formData) => {
    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbxoG96rnSRxfg4rOuBzXGXpMYaWaJYfpZSifG9hgrLWnXFfcQ7FkPuxQ7Rjg6fukSwU/exec",
        {
          method: "POST",
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        if (onSuccess) {
          onSuccess();
        }
        return true;
      } else {
        alert("Ошибка при добавлении фильма");
        return false;
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Ошибка при добавлении фильма");
      return false;
    }
  };

  return (
    <div>
      <MovieForm onSubmit={handleFormSubmit} />
    </div>
  );
}
