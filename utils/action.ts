"use server";

import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { createAndEditJobSchema, CreateAndEditJobType, JobType } from "./types";
import prisma from "./db";
import { Prisma } from "@prisma/client";

const authenticateAndRedirect = (): string => {
  const { userId } = auth();
  if (!userId) {
    redirect("/");
  }
  return userId;
};

export const createJobAction = async (
  values: CreateAndEditJobType
): Promise<JobType | null> => {
  const userId = authenticateAndRedirect();
  try {
    createAndEditJobSchema.parse(values);
    const job: JobType = await prisma.job.create({
      data: {
        ...values,

        clerkId: userId,
      },
    });
    return job;
  } catch (error) {
    console.log(error);
    return null;
  }
};

type GeatAllJobTypes = {
  search?: string;
  jobStatus?: string;
  page?: number;
  limit?: number;
};

type ReturnAllJobDataType = {
  jobs: JobType[];
  count: number;
  page: number;
  totalPage: number;
};

export const getAllJobsAction = async ({
  search,
  jobStatus,
  page,
  limit,
}: GeatAllJobTypes): Promise<ReturnAllJobDataType> => {
  const userId = authenticateAndRedirect();

  try {
    let whereClause: Prisma.JobWhereInput = {
      clerkId: userId,
    };

    if (search) {
      whereClause = {
        ...whereClause,
        OR: [
          {
            position: { contains: search },
          },
          {
            company: { contains: search },
          },
        ],
      };
    }

    if (jobStatus && jobStatus !== "all") {
      whereClause = {
        ...whereClause,
        status: jobStatus,
      };
    }

    const jobs: JobType[] = await prisma.job.findMany({
      where: whereClause,
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      jobs,
      count: 0,
      page: 1,
      totalPage: 0,
    };
  } catch (error) {
    console.log(error);
    return {
      jobs: [],
      count: 0,
      page: 1,
      totalPage: 0,
    };
  }
};

export const deleteJobAction = async (id: string): Promise<JobType | null> => {
  const userId = authenticateAndRedirect();
  try {
    const job: JobType = await prisma.job.delete({
      where: {
        id,
        clerkId: userId,
      },
    });
    return job;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getSingleJobAction = async (
  id: string
): Promise<JobType | null> => {
  let job: JobType | null = null;
  const userId = authenticateAndRedirect();
  try {
    job = await prisma.job.findUnique({
      where: {
        id,
        clerkId: userId,
      },
    });
  } catch (error) {
    console.log(error);
    return null;
  }
  if (!job) {
    redirect("/jobs");
  }
  return job;
};

export const updateJobAction = async (
  id: string,
  values: CreateAndEditJobType
): Promise<JobType | null> => {
  const userId = authenticateAndRedirect();

  try {
    const job = await prisma.job.update({
      where: {
        id,
        clerkId: userId,
      },
      data: { ...values },
    });
    return job;
  } catch (error) {
    console.log(error);
    return null;
  }
};
