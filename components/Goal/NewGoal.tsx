import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { StyleSheet } from "react-native";
import "./NewGoal.css";

const goalSchema = z.object({
  goalName: z
    .string()
    .min(3, { message: "Nazwa celu musi mieć co najmniej 3 znaki" })
    .max(50, { message: "Nazwa celu nie może przekraczać 50 znaków" }),
  goalAmount: z.number({ invalid_type_error: "Wprowadź poprawną kwotę" }).positive({ message: "Kwota musi być większa od zera" }),
});

type GoalFormData = z.infer<typeof goalSchema>;

export default function NewGoal() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<GoalFormData>({
    resolver: zodResolver(goalSchema),
    defaultValues: {
      goalName: "",
      goalAmount: undefined,
    },
  });

  const onSubmit = (data: GoalFormData) => {
    console.log("Dane formularza:", data);
    // Tutaj możesz dodać logikę zapisywania danych
  };

  const handleCancel = () => {
    // Tutaj możesz dodać logikę anulowania (np. nawigacja wstecz)
    console.log("Anulowano");
  };

  return (
    <div className="goal-form-container">
      <h2>Nowy / Edytuj cel</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="goalName">Nazwa celu</label>
          <input id="goalName" type="text" {...register("goalName")} className={errors.goalName ? "input-error" : ""} />
          {errors.goalName && <p className="error-message">{errors.goalName.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="goalAmount">Kwota</label>
          <input
            id="goalAmount"
            type="number"
            step="0.01"
            {...register("goalAmount", { valueAsNumber: true })}
            className={errors.goalAmount ? "input-error" : ""}
          />
          {errors.goalAmount && <p className="error-message">{errors.goalAmount.message}</p>}
        </div>

        <div className="form-buttons">
          <button type="submit" className="btn-save">
            Zapisz
          </button>
          <button type="button" className="btn-cancel" onClick={handleCancel}>
            Anuluj
          </button>
          <button type="button" className="btn-clear" onClick={() => reset()}>
            Wyczyść
          </button>
        </div>
      </form>
    </div>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
