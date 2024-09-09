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
import DeleteJobBtn from "./DeleteJobBtn";

const JobCard = ({ job }: { job: JobType }) => {
  const { createdAt, position, company, id } = job;
  const date = new Date(createdAt).toLocaleDateString();

  return (
    <Card className="bg-muted">
      <CardHeader>
        <CardTitle>{position}</CardTitle>
        <CardDescription>{company}</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent>{/* card indo */}</CardContent>
      <CardFooter className="flex gap-4">
        <Button asChild size="sm">
          <Link href={`/jobs/${job.id}`}>Edit</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
export default JobCard;
