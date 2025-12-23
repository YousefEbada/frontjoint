import { DOCTOR_REPO, NIXPEND_ADAPTER } from "app/container.bindings";
import { SyncDoctorJob } from "./syncDoctors.job";
import { resolve } from "app/container"

export function StartJobs() {
    const doctorSyncJob = new SyncDoctorJob(resolve(NIXPEND_ADAPTER), resolve(DOCTOR_REPO));
    doctorSyncJob.schedule("*/10 * * * *"); // every 10 minutes

    // another jobs can be started here
}