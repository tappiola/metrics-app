import React, { useState } from "react";
import Modal from "../Modal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createReport, fetchMetrics } from "../../api/actions";
import { Metric, MetricType } from "../../pages/Reports/Reports.types";
import Input from "../Input";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { MetricOption } from "./CreateReport.types";

const CreateReport = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<MetricOption[]>([]);
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["listMetrics"],
    queryFn: fetchMetrics,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    trigger,
  } = useForm();

  const mutation = useMutation({
    mutationFn: createReport,
  });

  const onCancel = () => {
    setIsModalOpen(false);
    setSelectedOptions([]);
  };
  const onConfirm = (formData: { [key: string]: string | MetricType }) => {
    trigger("formStatus");

    if (Object.keys(formData).length <= 1) {
      return;
    }

    mutation.mutate(formData, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["listReports"] });
        setIsModalOpen(false);
      },
    });
  };

  return (
    <>
      <button onClick={() => setIsModalOpen(true)}>Create report</button>
      {isModalOpen && (
        <Modal id="add-report-modal" onCancel={onCancel}>
          <Select
            value={selectedOptions}
            isMulti
            name="metrics-select"
            options={(data as Metric[]).map(({ id, description, type }) => ({
              label: description,
              value: id,
              type,
            }))}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={(selectedValues) =>
              setSelectedOptions(selectedValues as MetricOption[])
            }
          />
          <form className="modal__form" onSubmit={handleSubmit(onConfirm)}>
            <Input
              id="title"
              label="Title"
              errorMessage={errors.title?.message as string}
              {...register("title", { required: "Title is required" })}
            />
            <Input
              id="description"
              label="Description"
              errorMessage={errors.description?.message as string}
              {...register("description", {
                required: "Description is required",
              })}
            />
            {selectedOptions.map(({ value, label, type }) => (
              <Input
                key={value}
                id={value}
                label={label}
                type={type === MetricType.Boolean ? "checkbox" : "text"}
                {...register(value, {
                  required:
                    type !== MetricType.Boolean && "Metric value is required",
                  validate: (value) => {
                    if (type === MetricType.Number && isNaN(value)) {
                      return "Please enter a valid number or remove metric";
                    }

                    return true;
                  },
                })}
                errorMessage={errors?.[value]?.message as string}
              />
            ))}
            <Input
              type="hidden"
              label=""
              {...register("formStatus", {
                validate: () =>
                  Object.keys(getValues()).length > 1 ||
                  "Please add at least one metric",
              })}
              errorMessage={errors?.formStatus?.message as string}
            />
            <button onClick={onCancel}>Cancel</button>
            <button type="submit">Add report</button>
          </form>
        </Modal>
      )}
    </>
  );
};

export default CreateReport;
