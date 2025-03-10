import type { TaskRun, WorkerDeployment } from "@trigger.dev/database";
import { z } from "zod";
import { TaskRunListSearchFilters } from "~/components/runs/v3/RunFilters";
import type { Organization } from "~/models/organization.server";
import type { Project } from "~/models/project.server";
import { objectToSearchParams } from "./searchParams";

export type OrgForPath = Pick<Organization, "slug">;
export type ProjectForPath = Pick<Project, "slug">;
export type v3RunForPath = Pick<TaskRun, "friendlyId">;
export type v3SpanForPath = Pick<TaskRun, "spanId">;
export type DeploymentForPath = Pick<WorkerDeployment, "shortCode">;
export type TaskForPath = {
  taskIdentifier: string;
};

export const OrganizationParamsSchema = z.object({
  organizationSlug: z.string(),
});

export const ProjectParamSchema = OrganizationParamsSchema.extend({
  projectParam: z.string(),
});

//v3
export const v3TaskParamsSchema = ProjectParamSchema.extend({
  taskParam: z.string(),
});

export const v3RunParamsSchema = ProjectParamSchema.extend({
  runParam: z.string(),
});

export const v3SpanParamsSchema = v3RunParamsSchema.extend({
  spanParam: z.string(),
});

export const v3DeploymentParams = ProjectParamSchema.extend({
  deploymentParam: z.string(),
});

export const v3ScheduleParams = ProjectParamSchema.extend({
  scheduleParam: z.string(),
});

export function rootPath() {
  return `/`;
}

export function accountPath() {
  return `/account`;
}

export function personalAccessTokensPath() {
  return `/account/tokens`;
}

export function invitesPath() {
  return `/invites`;
}

export function confirmBasicDetailsPath() {
  return `/confirm-basic-details`;
}

export function acceptInvitePath(token: string) {
  return `/invite-accept?token=${token}`;
}

export function resendInvitePath() {
  return `/invite-resend`;
}

export function logoutPath() {
  return `/logout`;
}

export function revokeInvitePath() {
  return `/invite-revoke`;
}

// Org
export function organizationPath(organization: OrgForPath) {
  return `/orgs/${organizationParam(organization)}`;
}

export function newOrganizationPath() {
  return `/orgs/new`;
}

export function selectPlanPath(organization: OrgForPath) {
  return `${organizationPath(organization)}/select-plan`;
}

export function organizationTeamPath(organization: OrgForPath) {
  return `${organizationPath(organization)}/team`;
}

export function inviteTeamMemberPath(organization: OrgForPath) {
  return `${organizationPath(organization)}/invite`;
}

export function organizationBillingPath(organization: OrgForPath) {
  return `${organizationPath(organization)}/billing`;
}

export function organizationSettingsPath(organization: OrgForPath) {
  return `${organizationPath(organization)}/settings`;
}

function organizationParam(organization: OrgForPath) {
  return organization.slug;
}

// Project
export function newProjectPath(organization: OrgForPath, message?: string) {
  return `${organizationPath(organization)}/projects/new${
    message ? `?message=${encodeURIComponent(message)}` : ""
  }`;
}

function projectParam(project: ProjectForPath) {
  return project.slug;
}

//v3 project
export function v3ProjectPath(organization: OrgForPath, project: ProjectForPath) {
  return `/orgs/${organizationParam(organization)}/projects/v3/${projectParam(project)}`;
}

export function v3TasksStreamingPath(organization: OrgForPath, project: ProjectForPath) {
  return `${v3ProjectPath(organization, project)}/tasks/stream`;
}

export function v3ApiKeysPath(organization: OrgForPath, project: ProjectForPath) {
  return `${v3ProjectPath(organization, project)}/apikeys`;
}

export function v3EnvironmentVariablesPath(organization: OrgForPath, project: ProjectForPath) {
  return `${v3ProjectPath(organization, project)}/environment-variables`;
}

export function v3ConcurrencyPath(organization: OrgForPath, project: ProjectForPath) {
  return `${v3ProjectPath(organization, project)}/concurrency`;
}

export function v3NewEnvironmentVariablesPath(organization: OrgForPath, project: ProjectForPath) {
  return `${v3EnvironmentVariablesPath(organization, project)}/new`;
}

export function v3ProjectAlertsPath(organization: OrgForPath, project: ProjectForPath) {
  return `${v3ProjectPath(organization, project)}/alerts`;
}

export function v3NewProjectAlertPath(organization: OrgForPath, project: ProjectForPath) {
  return `${v3ProjectAlertsPath(organization, project)}/new`;
}

export function v3NewProjectAlertPathConnectToSlackPath(
  organization: OrgForPath,
  project: ProjectForPath
) {
  return `${v3ProjectAlertsPath(organization, project)}/new/connect-to-slack`;
}

export function v3TestPath(
  organization: OrgForPath,
  project: ProjectForPath,
  environmentSlug?: string
) {
  return `${v3ProjectPath(organization, project)}/test${
    environmentSlug ? `?environment=${environmentSlug}` : ""
  }`;
}

export function v3TestTaskPath(
  organization: OrgForPath,
  project: ProjectForPath,
  task: TaskForPath,
  environmentSlug: string
) {
  return `${v3TestPath(organization, project)}/tasks/${encodeURIComponent(
    task.taskIdentifier
  )}?environment=${environmentSlug}`;
}

export function v3RunsPath(
  organization: OrgForPath,
  project: ProjectForPath,
  filters?: TaskRunListSearchFilters
) {
  const searchParams = objectToSearchParams(filters);
  const query = searchParams ? `?${searchParams.toString()}` : "";
  return `${v3ProjectPath(organization, project)}/runs${query}`;
}

export function v3RunPath(organization: OrgForPath, project: ProjectForPath, run: v3RunForPath) {
  return `${v3RunsPath(organization, project)}/${run.friendlyId}`;
}

export function v3RunDownloadLogsPath(run: v3RunForPath) {
  return `/resources/runs/${run.friendlyId}/logs/download`;
}

export function v3RunSpanPath(
  organization: OrgForPath,
  project: ProjectForPath,
  run: v3RunForPath,
  span: v3SpanForPath
) {
  return `${v3RunPath(organization, project, run)}?span=${span.spanId}`;
}

export function v3RunStreamingPath(
  organization: OrgForPath,
  project: ProjectForPath,
  run: v3RunForPath
) {
  return `${v3RunPath(organization, project, run)}/stream`;
}

export function v3SchedulesPath(organization: OrgForPath, project: ProjectForPath) {
  return `${v3ProjectPath(organization, project)}/schedules`;
}

export function v3SchedulePath(
  organization: OrgForPath,
  project: ProjectForPath,
  schedule: { friendlyId: string }
) {
  return `${v3ProjectPath(organization, project)}/schedules/${schedule.friendlyId}`;
}

export function v3EditSchedulePath(
  organization: OrgForPath,
  project: ProjectForPath,
  schedule: { friendlyId: string }
) {
  return `${v3ProjectPath(organization, project)}/schedules/edit/${schedule.friendlyId}`;
}

export function v3NewSchedulePath(organization: OrgForPath, project: ProjectForPath) {
  return `${v3ProjectPath(organization, project)}/schedules/new`;
}

export function v3BatchesPath(organization: OrgForPath, project: ProjectForPath) {
  return `${v3ProjectPath(organization, project)}/batches`;
}

export function v3BatchPath(
  organization: OrgForPath,
  project: ProjectForPath,
  batch: { friendlyId: string }
) {
  return `${v3ProjectPath(organization, project)}/batches?id=${batch.friendlyId}`;
}

export function v3BatchRunsPath(
  organization: OrgForPath,
  project: ProjectForPath,
  batch: { friendlyId: string }
) {
  return `${v3ProjectPath(organization, project)}/runs?batchId=${batch.friendlyId}`;
}

export function v3ProjectSettingsPath(organization: OrgForPath, project: ProjectForPath) {
  return `${v3ProjectPath(organization, project)}/settings`;
}

export function v3DeploymentsPath(organization: OrgForPath, project: ProjectForPath) {
  return `${v3ProjectPath(organization, project)}/deployments`;
}

export function v3DeploymentPath(
  organization: OrgForPath,
  project: ProjectForPath,
  deployment: DeploymentForPath,
  currentPage: number
) {
  const query = currentPage ? `?page=${currentPage}` : "";
  return `${v3DeploymentsPath(organization, project)}/${deployment.shortCode}${query}`;
}

export function v3BillingPath(organization: OrgForPath) {
  return `${organizationPath(organization)}/v3/billing`;
}

export function v3StripePortalPath(organization: OrgForPath) {
  return `/resources/${organization.slug}/subscription/v3/portal`;
}

export function v3UsagePath(organization: OrgForPath) {
  return `${organizationPath(organization)}/v3/usage`;
}

// Task
export function runTaskPath(runPath: string, taskId: string) {
  return `${runPath}/tasks/${taskId}`;
}

// Event
export function runTriggerPath(runPath: string) {
  return `${runPath}/trigger`;
}

// Event
export function runCompletedPath(runPath: string) {
  return `${runPath}/completed`;
}

// Docs
export function docsRoot() {
  return "https://trigger.dev/docs";
}

export function docsPath(path: string) {
  return `${docsRoot()}/${path}`;
}

export function docsTroubleshootingPath(path: string) {
  return `${docsRoot()}/v3/troubleshooting`;
}

export function docsIntegrationPath(api: string) {
  return `${docsRoot()}/integrations/apis/${api}`;
}

export function docsCreateIntegration() {
  return `${docsRoot()}/integrations/create`;
}

//api
export function apiReferencePath(apiSlug: string) {
  return `https://trigger.dev/apis/${apiSlug}`;
}
