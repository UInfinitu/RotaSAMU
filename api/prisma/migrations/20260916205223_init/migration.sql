-- CreateEnum
CREATE TYPE "TipoUsuario" AS ENUM ('MOTORISTA', 'ATENDENTE');

-- CreateEnum
CREATE TYPE "StatusUsuario" AS ENUM ('ONLINE', 'OFFLINE');

-- CreateEnum
CREATE TYPE "StatusAtendimento" AS ENUM ('NAO_INICIADO', 'EM_ANDAMENTO', 'FINALIZADO');

-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "tipo" "TipoUsuario" NOT NULL,
    "telefone" TEXT NOT NULL,
    "status" "StatusUsuario" NOT NULL DEFAULT 'OFFLINE',
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Veiculo" (
    "id" TEXT NOT NULL,
    "placa" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "motoristaId" TEXT NOT NULL,

    CONSTRAINT "Veiculo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Atendimento" (
    "id" TEXT NOT NULL,
    "protocolo" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "localDeRetorno" TEXT NOT NULL,
    "oQueAconteceu" TEXT NOT NULL,
    "estadoDoPaciente" TEXT NOT NULL,
    "idadeAparente" INTEGER,
    "quantidadeDePacientes" INTEGER NOT NULL,
    "estadoDaLesao" TEXT NOT NULL,
    "observacoes" TEXT,
    "atendenteId" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Atendimento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VeiculoAtendimento" (
    "id" TEXT NOT NULL,
    "status" "StatusAtendimento" NOT NULL DEFAULT 'NAO_INICIADO',
    "veiculoId" TEXT NOT NULL,
    "atendimentoId" TEXT NOT NULL,

    CONSTRAINT "VeiculoAtendimento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Conversa" (
    "id" TEXT NOT NULL,
    "atendenteId" TEXT NOT NULL,
    "motoristaId" TEXT NOT NULL,

    CONSTRAINT "Conversa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mensagem" (
    "id" TEXT NOT NULL,
    "texto" TEXT NOT NULL,
    "dataDeEnvio" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "quemMandouId" TEXT NOT NULL,
    "conversaId" TEXT NOT NULL,

    CONSTRAINT "Mensagem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notificacao" (
    "id" TEXT NOT NULL,
    "mensagem" TEXT NOT NULL,
    "dataDaNotificacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atendimentoId" TEXT NOT NULL,

    CONSTRAINT "Notificacao_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Veiculo_placa_key" ON "Veiculo"("placa");

-- CreateIndex
CREATE UNIQUE INDEX "Veiculo_motoristaId_key" ON "Veiculo"("motoristaId");

-- CreateIndex
CREATE UNIQUE INDEX "Atendimento_protocolo_key" ON "Atendimento"("protocolo");

-- AddForeignKey
ALTER TABLE "Veiculo" ADD CONSTRAINT "Veiculo_motoristaId_fkey" FOREIGN KEY ("motoristaId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Atendimento" ADD CONSTRAINT "Atendimento_atendenteId_fkey" FOREIGN KEY ("atendenteId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VeiculoAtendimento" ADD CONSTRAINT "VeiculoAtendimento_veiculoId_fkey" FOREIGN KEY ("veiculoId") REFERENCES "Veiculo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VeiculoAtendimento" ADD CONSTRAINT "VeiculoAtendimento_atendimentoId_fkey" FOREIGN KEY ("atendimentoId") REFERENCES "Atendimento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conversa" ADD CONSTRAINT "Conversa_atendenteId_fkey" FOREIGN KEY ("atendenteId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conversa" ADD CONSTRAINT "Conversa_motoristaId_fkey" FOREIGN KEY ("motoristaId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mensagem" ADD CONSTRAINT "Mensagem_quemMandouId_fkey" FOREIGN KEY ("quemMandouId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mensagem" ADD CONSTRAINT "Mensagem_conversaId_fkey" FOREIGN KEY ("conversaId") REFERENCES "Conversa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notificacao" ADD CONSTRAINT "Notificacao_atendimentoId_fkey" FOREIGN KEY ("atendimentoId") REFERENCES "Atendimento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
