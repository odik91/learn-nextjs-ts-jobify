import { JobType } from "@/utils/types";
import { Briefcase, CalendarDays, MapPin, RadioTower } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import JobInfo from "./JobInfo";
import DeleteJobButton from "./DeleteJobButton";

export const formatDate = (dateString: Date): string => {
  const date = new Date(dateString);

  // Ambil hari, bulan, dan tahun dari objek Date
  const day = date.getDate();
  const month = date.getMonth() + 1; // Bulan dimulai dari 0, jadi tambah 1
  const year = date.getFullYear();

  // Gabungkan menjadi format "d-m-yyyy"
  return `${day}-${month}-${year}`;
};

const JobCard = ({ job }: { job: JobType }) => {
  const date = formatDate(job.createdAt);

  return (
    <Card className="bg-muted">
      <CardHeader>
        <CardTitle>{job.position}</CardTitle>
        <CardDescription>{job.company}</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="mt-4 grid grid-cols-2 gap-4">
        <JobInfo icon={<Briefcase />} text={job.mode} />
        <JobInfo icon={<MapPin />} text={job.location} />
        <JobInfo icon={<CalendarDays />} text={date} />
        <Badge className="w-32  justify-center">
          <JobInfo
            icon={<RadioTower className="w-4 h-4" />}
            text={job.status}
          />
        </Badge>
      </CardContent>
      <CardFooter className="flex gap-4">
        <Button asChild size="sm">
          <Link href={`/jobs/${job.id}`}>edit</Link>
        </Button>
        <DeleteJobButton id={job.id} />
      </CardFooter>
    </Card>
  );
};
export default JobCard;
