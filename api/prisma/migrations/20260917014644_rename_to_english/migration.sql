/*
  Warnings:

  - You are about to drop the `Atendimento` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Conversa` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Mensagem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Notificacao` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Usuario` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Veiculo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VeiculoAtendimento` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('DRIVER', 'ATTENDANT');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ONLINE', 'OFFLINE');

-- CreateEnum
CREATE TYPE "EmergencyCallStatus" AS ENUM ('NOT_STARTED', 'IN_PROGRESS', 'FINISHED');

-- DropForeignKey
ALTER TABLE "Atendimento" DROP CONSTRAINT "Atendimento_atendenteId_fkey";

-- DropForeignKey
ALTER TABLE "Conversa" DROP CONSTRAINT "Conversa_atendenteId_fkey";

-- DropForeignKey
ALTER TABLE "Conversa" DROP CONSTRAINT "Conversa_motoristaId_fkey";

-- DropForeignKey
ALTER TABLE "Mensagem" DROP CONSTRAINT "Mensagem_conversaId_fkey";

-- DropForeignKey
ALTER TABLE "Mensagem" DROP CONSTRAINT "Mensagem_quemMandouId_fkey";

-- DropForeignKey
ALTER TABLE "Notificacao" DROP CONSTRAINT "Notificacao_atendimentoId_fkey";

-- DropForeignKey
ALTER TABLE "Veiculo" DROP CONSTRAINT "Veiculo_motoristaId_fkey";

-- DropForeignKey
ALTER TABLE "VeiculoAtendimento" DROP CONSTRAINT "VeiculoAtendimento_atendimentoId_fkey";

-- DropForeignKey
ALTER TABLE "VeiculoAtendimento" DROP CONSTRAINT "VeiculoAtendimento_veiculoId_fkey";

-- DropTable
DROP TABLE "Atendimento";

-- DropTable
DROP TABLE "Conversa";

-- DropTable
DROP TABLE "Mensagem";

-- DropTable
DROP TABLE "Notificacao";

-- DropTable
DROP TABLE "Usuario";

-- DropTable
DROP TABLE "Veiculo";

-- DropTable
DROP TABLE "VeiculoAtendimento";

-- DropEnum
DROP TYPE "StatusAtendimento";

-- DropEnum
DROP TYPE "StatusUsuario";

-- DropEnum
DROP TYPE "TipoUsuario";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "UserRole" NOT NULL,
    "phone" TEXT NOT NULL,
    "status" "UserStatus" NOT NULL DEFAULT 'OFFLINE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vehicle" (
    "id" TEXT NOT NULL,
    "plate" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "driverId" TEXT NOT NULL,

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmergencyCall" (
    "id" TEXT NOT NULL,
    "protocol" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "returnLocation" TEXT NOT NULL,
    "whatHappened" TEXT NOT NULL,
    "patientCondition" TEXT NOT NULL,
    "apparentAge" INTEGER,
    "patientCount" INTEGER NOT NULL,
    "injuryCondition" TEXT NOT NULL,
    "observations" TEXT,
    "attendantId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EmergencyCall_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VehicleEmergencyCall" (
    "id" TEXT NOT NULL,
    "status" "EmergencyCallStatus" NOT NULL DEFAULT 'NOT_STARTED',
    "vehicleId" TEXT NOT NULL,
    "emergencyCallId" TEXT NOT NULL,

    CONSTRAINT "VehicleEmergencyCall_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Conversation" (
    "id" TEXT NOT NULL,
    "attendantId" TEXT NOT NULL,
    "driverId" TEXT NOT NULL,

    CONSTRAINT "Conversation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "sentAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "senderId" TEXT NOT NULL,
    "conversationId" TEXT NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "notifiedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "emergencyCallId" TEXT NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_plate_key" ON "Vehicle"("plate");

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_driverId_key" ON "Vehicle"("driverId");

-- CreateIndex
CREATE UNIQUE INDEX "EmergencyCall_protocol_key" ON "EmergencyCall"("protocol");

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmergencyCall" ADD CONSTRAINT "EmergencyCall_attendantId_fkey" FOREIGN KEY ("attendantId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VehicleEmergencyCall" ADD CONSTRAINT "VehicleEmergencyCall_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VehicleEmergencyCall" ADD CONSTRAINT "VehicleEmergencyCall_emergencyCallId_fkey" FOREIGN KEY ("emergencyCallId") REFERENCES "EmergencyCall"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_attendantId_fkey" FOREIGN KEY ("attendantId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_emergencyCallId_fkey" FOREIGN KEY ("emergencyCallId") REFERENCES "EmergencyCall"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
