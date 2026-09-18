/*
  Warnings:

  - Added the required column `memberEmail` to the `workspace_invites` table without a default value. This is not possible if the table is not empty.
  - Added the required column `memberName` to the `workspace_invites` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "workspace_invites" ADD COLUMN     "memberEmail" TEXT,
ADD COLUMN     "memberName" TEXT;
