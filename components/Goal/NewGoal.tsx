import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { StyleSheet, View } from "react-native";

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

  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
