import React, { useState } from "react";
import Modal from "../Modal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createReport, fetchMetrics } from "../../api/actions";
import { Metric, MetricType } from "../../pages/Reports/Reports.types";
import Input from "../Input";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { MetricOption } from "./CreateReport.types";
import Button, { ButtonVariant } from "../Button/Button";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import "./CreateReport.css";
import { selectConfig } from "./theme";

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
    reset,
  } = useForm();

  const { isError, mutate, isPending, error } = useMutation({
    mutationFn: createReport,
  });

  const onCancel = () => {
    setIsModalOpen(false);
    setSelectedOptions([]);
  };
  const onConfirm = (formData: { [key: string]: string | MetricType }) => {
    trigger("formStatus");

    if (Object.keys(formData).length <= 3) {
      return;
    }

    mutate(formData, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["listReports"] });
        reset();
        setIsModalOpen(false);
        setSelectedOptions([]);
      },
    });
  };

  return (
    <>
      <div className="create-report">
        <Button
          className="create-report-button"
          onClick={() => setIsModalOpen(true)}
        >
          Create report
        </Button>
      </div>
      {isModalOpen && (
        <Modal id="add-report-modal" onCancel={onCancel}>
          <h2>Add report</h2>
          <Select
            value={selectedOptions}
            placeholder="Select metric"
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
            isClearable={false}
            styles={selectConfig}
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
                {...register(value.replaceAll(".", "_"), {
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
                  Object.keys(getValues()).length > 3 ||
                  "Please add at least one metric",
              })}
              errorMessage={errors?.formStatus?.message as string}
            />
            {isError && <ErrorMessage text={error.message} />}
            <div className="add-report-modal__buttons">
              <Button variant={ButtonVariant.Secondary} onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit">
                {isPending ? "Loading..." : "Add report"}
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};

export default CreateReport;
