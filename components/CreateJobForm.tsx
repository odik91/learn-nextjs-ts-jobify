"use client";

import {
  createAndEditJobSchema,
  CreateAndEditJobType,
  JobMode,
  JobStatus,
} from "@/utils/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CustomFormField, CustomFormSelect } from "./FormComponents";
import { Form } from "./ui/form";
import { Button } from "./ui/button";

const CreateJobForm = () => {
  // 1. define your form
  const form = useForm<CreateAndEditJobType>({
    resolver: zodResolver(createAndEditJobSchema),
    defaultValues: {
      position: "",
      company: "",
      location: "",
      status: JobStatus.Pending,
      mode: JobMode.FullTime,
    },
  });

  const onSubmit = (values: CreateAndEditJobType) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-muted p-8 rounded"
      >
        <h2 className="capitalize font-semibold text-4xl mb-6">add job</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* position */}
          <CustomFormField<CreateAndEditJobType>
            name="position"
            control={form.control}
          />

          {/* company */}
          <CustomFormField<CreateAndEditJobType>
            name="company"
            control={form.control}
          />

          {/* location */}
          <CustomFormField<CreateAndEditJobType>
            name="location"
            control={form.control}
          />

          {/* job status */}
          <CustomFormSelect
            name="status"
            control={form.control}
            labelText="job status"
            items={Object.values(JobStatus)}
          />

          {/* job type */}
          <CustomFormSelect
            name="mode"
            control={form.control}
            labelText="job mode"
            items={Object.values(JobMode)}
          />

          <Button type="submit" className="self-end capitalize">
            create job
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateJobForm;
