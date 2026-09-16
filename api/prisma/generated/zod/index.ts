import { z } from "zod";
import type { Prisma } from "@prisma/client";

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum([
  "ReadUncommitted",
  "ReadCommitted",
  "RepeatableRead",
  "Serializable",
]);

export const UsuarioScalarFieldEnumSchema = z.enum([
  "id",
  "email",
  "senha",
  "tipo",
  "telefone",
  "status",
  "criadoEm",
]);

export const VeiculoScalarFieldEnumSchema = z.enum([
  "id",
  "placa",
  "latitude",
  "longitude",
  "motoristaId",
]);

export const AtendimentoScalarFieldEnumSchema = z.enum([
  "id",
  "protocolo",
  "endereco",
  "localDeRetorno",
  "oQueAconteceu",
  "estadoDoPaciente",
  "idadeAparente",
  "quantidadeDePacientes",
  "estadoDaLesao",
  "observacoes",
  "atendenteId",
  "criadoEm",
]);

export const VeiculoAtendimentoScalarFieldEnumSchema = z.enum([
  "id",
  "status",
  "veiculoId",
  "atendimentoId",
]);

export const ConversaScalarFieldEnumSchema = z.enum([
  "id",
  "atendenteId",
  "motoristaId",
]);

export const MensagemScalarFieldEnumSchema = z.enum([
  "id",
  "texto",
  "dataDeEnvio",
  "quemMandouId",
  "conversaId",
]);

export const NotificacaoScalarFieldEnumSchema = z.enum([
  "id",
  "mensagem",
  "dataDaNotificacao",
  "atendimentoId",
]);

export const SortOrderSchema = z.enum(["asc", "desc"]);

export const QueryModeSchema = z.enum(["default", "insensitive"]);

export const NullsOrderSchema = z.enum(["first", "last"]);

export const TipoUsuarioSchema = z.enum(["MOTORISTA", "ATENDENTE"]);

export type TipoUsuarioType = `${z.infer<typeof TipoUsuarioSchema>}`;

export const StatusUsuarioSchema = z.enum(["ONLINE", "OFFLINE"]);

export type StatusUsuarioType = `${z.infer<typeof StatusUsuarioSchema>}`;

export const StatusAtendimentoSchema = z.enum([
  "NAO_INICIADO",
  "EM_ANDAMENTO",
  "FINALIZADO",
]);

export type StatusAtendimentoType =
  `${z.infer<typeof StatusAtendimentoSchema>}`;

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USUARIO SCHEMA
/////////////////////////////////////////

export const UsuarioSchema = z.object({
  tipo: TipoUsuarioSchema,
  status: StatusUsuarioSchema,
  id: z.uuid(),
  email: z.string(),
  senha: z.string(),
  telefone: z.string(),
  criadoEm: z.coerce.date(),
});

export type Usuario = z.infer<typeof UsuarioSchema>;

/////////////////////////////////////////
// VEICULO SCHEMA
/////////////////////////////////////////

export const VeiculoSchema = z.object({
  id: z.uuid(),
  placa: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  motoristaId: z.string(),
});

export type Veiculo = z.infer<typeof VeiculoSchema>;

/////////////////////////////////////////
// ATENDIMENTO SCHEMA
/////////////////////////////////////////

export const AtendimentoSchema = z.object({
  id: z.uuid(),
  protocolo: z.string(),
  endereco: z.string(),
  localDeRetorno: z.string(),
  oQueAconteceu: z.string(),
  estadoDoPaciente: z.string(),
  idadeAparente: z.number().int().nullable(),
  quantidadeDePacientes: z.number().int(),
  estadoDaLesao: z.string(),
  observacoes: z.string().nullable(),
  atendenteId: z.string(),
  criadoEm: z.coerce.date(),
});

export type Atendimento = z.infer<typeof AtendimentoSchema>;

/////////////////////////////////////////
// VEICULO ATENDIMENTO SCHEMA
/////////////////////////////////////////

export const VeiculoAtendimentoSchema = z.object({
  status: StatusAtendimentoSchema,
  id: z.uuid(),
  veiculoId: z.string(),
  atendimentoId: z.string(),
});

export type VeiculoAtendimento = z.infer<typeof VeiculoAtendimentoSchema>;

/////////////////////////////////////////
// CONVERSA SCHEMA
/////////////////////////////////////////

export const ConversaSchema = z.object({
  id: z.uuid(),
  atendenteId: z.string(),
  motoristaId: z.string(),
});

export type Conversa = z.infer<typeof ConversaSchema>;

/////////////////////////////////////////
// MENSAGEM SCHEMA
/////////////////////////////////////////

export const MensagemSchema = z.object({
  id: z.uuid(),
  texto: z.string(),
  dataDeEnvio: z.coerce.date(),
  quemMandouId: z.string(),
  conversaId: z.string(),
});

export type Mensagem = z.infer<typeof MensagemSchema>;

/////////////////////////////////////////
// NOTIFICACAO SCHEMA
/////////////////////////////////////////

export const NotificacaoSchema = z.object({
  id: z.uuid(),
  mensagem: z.string(),
  dataDaNotificacao: z.coerce.date(),
  atendimentoId: z.string(),
});

export type Notificacao = z.infer<typeof NotificacaoSchema>;

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USUARIO
//------------------------------------------------------

export const UsuarioIncludeSchema: z.ZodType<Prisma.UsuarioInclude> = z
  .object({
    veiculo: z.union([z.boolean(), z.lazy(() => VeiculoArgsSchema)]).optional(),
    atendimentosRegistrados: z
      .union([z.boolean(), z.lazy(() => AtendimentoFindManyArgsSchema)])
      .optional(),
    conversasComoAtendente: z
      .union([z.boolean(), z.lazy(() => ConversaFindManyArgsSchema)])
      .optional(),
    conversasComoMotorista: z
      .union([z.boolean(), z.lazy(() => ConversaFindManyArgsSchema)])
      .optional(),
    mensagensEnviadas: z
      .union([z.boolean(), z.lazy(() => MensagemFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => UsuarioCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

export const UsuarioArgsSchema: z.ZodType<Prisma.UsuarioDefaultArgs> = z
  .object({
    select: z.lazy(() => UsuarioSelectSchema).optional(),
    include: z.lazy(() => UsuarioIncludeSchema).optional(),
  })
  .strict();

export const UsuarioCountOutputTypeArgsSchema: z.ZodType<Prisma.UsuarioCountOutputTypeDefaultArgs> =
  z
    .object({
      select: z.lazy(() => UsuarioCountOutputTypeSelectSchema).nullish(),
    })
    .strict();

export const UsuarioCountOutputTypeSelectSchema: z.ZodType<Prisma.UsuarioCountOutputTypeSelect> =
  z
    .object({
      atendimentosRegistrados: z.boolean().optional(),
      conversasComoAtendente: z.boolean().optional(),
      conversasComoMotorista: z.boolean().optional(),
      mensagensEnviadas: z.boolean().optional(),
    })
    .strict();

export const UsuarioSelectSchema: z.ZodType<Prisma.UsuarioSelect> = z
  .object({
    id: z.boolean().optional(),
    email: z.boolean().optional(),
    senha: z.boolean().optional(),
    tipo: z.boolean().optional(),
    telefone: z.boolean().optional(),
    status: z.boolean().optional(),
    criadoEm: z.boolean().optional(),
    veiculo: z.union([z.boolean(), z.lazy(() => VeiculoArgsSchema)]).optional(),
    atendimentosRegistrados: z
      .union([z.boolean(), z.lazy(() => AtendimentoFindManyArgsSchema)])
      .optional(),
    conversasComoAtendente: z
      .union([z.boolean(), z.lazy(() => ConversaFindManyArgsSchema)])
      .optional(),
    conversasComoMotorista: z
      .union([z.boolean(), z.lazy(() => ConversaFindManyArgsSchema)])
      .optional(),
    mensagensEnviadas: z
      .union([z.boolean(), z.lazy(() => MensagemFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => UsuarioCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

// VEICULO
//------------------------------------------------------

export const VeiculoIncludeSchema: z.ZodType<Prisma.VeiculoInclude> = z
  .object({
    motorista: z
      .union([z.boolean(), z.lazy(() => UsuarioArgsSchema)])
      .optional(),
    atendimentos: z
      .union([z.boolean(), z.lazy(() => VeiculoAtendimentoFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => VeiculoCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

export const VeiculoArgsSchema: z.ZodType<Prisma.VeiculoDefaultArgs> = z
  .object({
    select: z.lazy(() => VeiculoSelectSchema).optional(),
    include: z.lazy(() => VeiculoIncludeSchema).optional(),
  })
  .strict();

export const VeiculoCountOutputTypeArgsSchema: z.ZodType<Prisma.VeiculoCountOutputTypeDefaultArgs> =
  z
    .object({
      select: z.lazy(() => VeiculoCountOutputTypeSelectSchema).nullish(),
    })
    .strict();

export const VeiculoCountOutputTypeSelectSchema: z.ZodType<Prisma.VeiculoCountOutputTypeSelect> =
  z
    .object({
      atendimentos: z.boolean().optional(),
    })
    .strict();

export const VeiculoSelectSchema: z.ZodType<Prisma.VeiculoSelect> = z
  .object({
    id: z.boolean().optional(),
    placa: z.boolean().optional(),
    latitude: z.boolean().optional(),
    longitude: z.boolean().optional(),
    motoristaId: z.boolean().optional(),
    motorista: z
      .union([z.boolean(), z.lazy(() => UsuarioArgsSchema)])
      .optional(),
    atendimentos: z
      .union([z.boolean(), z.lazy(() => VeiculoAtendimentoFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => VeiculoCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

// ATENDIMENTO
//------------------------------------------------------

export const AtendimentoIncludeSchema: z.ZodType<Prisma.AtendimentoInclude> = z
  .object({
    atendente: z
      .union([z.boolean(), z.lazy(() => UsuarioArgsSchema)])
      .optional(),
    veiculos: z
      .union([z.boolean(), z.lazy(() => VeiculoAtendimentoFindManyArgsSchema)])
      .optional(),
    notificacoes: z
      .union([z.boolean(), z.lazy(() => NotificacaoFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => AtendimentoCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

export const AtendimentoArgsSchema: z.ZodType<Prisma.AtendimentoDefaultArgs> = z
  .object({
    select: z.lazy(() => AtendimentoSelectSchema).optional(),
    include: z.lazy(() => AtendimentoIncludeSchema).optional(),
  })
  .strict();

export const AtendimentoCountOutputTypeArgsSchema: z.ZodType<Prisma.AtendimentoCountOutputTypeDefaultArgs> =
  z
    .object({
      select: z.lazy(() => AtendimentoCountOutputTypeSelectSchema).nullish(),
    })
    .strict();

export const AtendimentoCountOutputTypeSelectSchema: z.ZodType<Prisma.AtendimentoCountOutputTypeSelect> =
  z
    .object({
      veiculos: z.boolean().optional(),
      notificacoes: z.boolean().optional(),
    })
    .strict();

export const AtendimentoSelectSchema: z.ZodType<Prisma.AtendimentoSelect> = z
  .object({
    id: z.boolean().optional(),
    protocolo: z.boolean().optional(),
    endereco: z.boolean().optional(),
    localDeRetorno: z.boolean().optional(),
    oQueAconteceu: z.boolean().optional(),
    estadoDoPaciente: z.boolean().optional(),
    idadeAparente: z.boolean().optional(),
    quantidadeDePacientes: z.boolean().optional(),
    estadoDaLesao: z.boolean().optional(),
    observacoes: z.boolean().optional(),
    atendenteId: z.boolean().optional(),
    criadoEm: z.boolean().optional(),
    atendente: z
      .union([z.boolean(), z.lazy(() => UsuarioArgsSchema)])
      .optional(),
    veiculos: z
      .union([z.boolean(), z.lazy(() => VeiculoAtendimentoFindManyArgsSchema)])
      .optional(),
    notificacoes: z
      .union([z.boolean(), z.lazy(() => NotificacaoFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => AtendimentoCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

// VEICULO ATENDIMENTO
//------------------------------------------------------

export const VeiculoAtendimentoIncludeSchema: z.ZodType<Prisma.VeiculoAtendimentoInclude> =
  z
    .object({
      veiculo: z
        .union([z.boolean(), z.lazy(() => VeiculoArgsSchema)])
        .optional(),
      atendimento: z
        .union([z.boolean(), z.lazy(() => AtendimentoArgsSchema)])
        .optional(),
    })
    .strict();

export const VeiculoAtendimentoArgsSchema: z.ZodType<Prisma.VeiculoAtendimentoDefaultArgs> =
  z
    .object({
      select: z.lazy(() => VeiculoAtendimentoSelectSchema).optional(),
      include: z.lazy(() => VeiculoAtendimentoIncludeSchema).optional(),
    })
    .strict();

export const VeiculoAtendimentoSelectSchema: z.ZodType<Prisma.VeiculoAtendimentoSelect> =
  z
    .object({
      id: z.boolean().optional(),
      status: z.boolean().optional(),
      veiculoId: z.boolean().optional(),
      atendimentoId: z.boolean().optional(),
      veiculo: z
        .union([z.boolean(), z.lazy(() => VeiculoArgsSchema)])
        .optional(),
      atendimento: z
        .union([z.boolean(), z.lazy(() => AtendimentoArgsSchema)])
        .optional(),
    })
    .strict();

// CONVERSA
//------------------------------------------------------

export const ConversaIncludeSchema: z.ZodType<Prisma.ConversaInclude> = z
  .object({
    atendente: z
      .union([z.boolean(), z.lazy(() => UsuarioArgsSchema)])
      .optional(),
    motorista: z
      .union([z.boolean(), z.lazy(() => UsuarioArgsSchema)])
      .optional(),
    mensagens: z
      .union([z.boolean(), z.lazy(() => MensagemFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => ConversaCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

export const ConversaArgsSchema: z.ZodType<Prisma.ConversaDefaultArgs> = z
  .object({
    select: z.lazy(() => ConversaSelectSchema).optional(),
    include: z.lazy(() => ConversaIncludeSchema).optional(),
  })
  .strict();

export const ConversaCountOutputTypeArgsSchema: z.ZodType<Prisma.ConversaCountOutputTypeDefaultArgs> =
  z
    .object({
      select: z.lazy(() => ConversaCountOutputTypeSelectSchema).nullish(),
    })
    .strict();

export const ConversaCountOutputTypeSelectSchema: z.ZodType<Prisma.ConversaCountOutputTypeSelect> =
  z
    .object({
      mensagens: z.boolean().optional(),
    })
    .strict();

export const ConversaSelectSchema: z.ZodType<Prisma.ConversaSelect> = z
  .object({
    id: z.boolean().optional(),
    atendenteId: z.boolean().optional(),
    motoristaId: z.boolean().optional(),
    atendente: z
      .union([z.boolean(), z.lazy(() => UsuarioArgsSchema)])
      .optional(),
    motorista: z
      .union([z.boolean(), z.lazy(() => UsuarioArgsSchema)])
      .optional(),
    mensagens: z
      .union([z.boolean(), z.lazy(() => MensagemFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => ConversaCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

// MENSAGEM
//------------------------------------------------------

export const MensagemIncludeSchema: z.ZodType<Prisma.MensagemInclude> = z
  .object({
    quemMandou: z
      .union([z.boolean(), z.lazy(() => UsuarioArgsSchema)])
      .optional(),
    conversa: z
      .union([z.boolean(), z.lazy(() => ConversaArgsSchema)])
      .optional(),
  })
  .strict();

export const MensagemArgsSchema: z.ZodType<Prisma.MensagemDefaultArgs> = z
  .object({
    select: z.lazy(() => MensagemSelectSchema).optional(),
    include: z.lazy(() => MensagemIncludeSchema).optional(),
  })
  .strict();

export const MensagemSelectSchema: z.ZodType<Prisma.MensagemSelect> = z
  .object({
    id: z.boolean().optional(),
    texto: z.boolean().optional(),
    dataDeEnvio: z.boolean().optional(),
    quemMandouId: z.boolean().optional(),
    conversaId: z.boolean().optional(),
    quemMandou: z
      .union([z.boolean(), z.lazy(() => UsuarioArgsSchema)])
      .optional(),
    conversa: z
      .union([z.boolean(), z.lazy(() => ConversaArgsSchema)])
      .optional(),
  })
  .strict();

// NOTIFICACAO
//------------------------------------------------------

export const NotificacaoIncludeSchema: z.ZodType<Prisma.NotificacaoInclude> = z
  .object({
    atendimento: z
      .union([z.boolean(), z.lazy(() => AtendimentoArgsSchema)])
      .optional(),
  })
  .strict();

export const NotificacaoArgsSchema: z.ZodType<Prisma.NotificacaoDefaultArgs> = z
  .object({
    select: z.lazy(() => NotificacaoSelectSchema).optional(),
    include: z.lazy(() => NotificacaoIncludeSchema).optional(),
  })
  .strict();

export const NotificacaoSelectSchema: z.ZodType<Prisma.NotificacaoSelect> = z
  .object({
    id: z.boolean().optional(),
    mensagem: z.boolean().optional(),
    dataDaNotificacao: z.boolean().optional(),
    atendimentoId: z.boolean().optional(),
    atendimento: z
      .union([z.boolean(), z.lazy(() => AtendimentoArgsSchema)])
      .optional(),
  })
  .strict();

/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UsuarioWhereInputSchema: z.ZodType<Prisma.UsuarioWhereInput> =
  z.strictObject({
    AND: z
      .union([
        z.lazy(() => UsuarioWhereInputSchema),
        z.lazy(() => UsuarioWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => UsuarioWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => UsuarioWhereInputSchema),
        z.lazy(() => UsuarioWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    email: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    senha: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    tipo: z
      .union([
        z.lazy(() => EnumTipoUsuarioFilterSchema),
        z.lazy(() => TipoUsuarioSchema),
      ])
      .optional(),
    telefone: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    status: z
      .union([
        z.lazy(() => EnumStatusUsuarioFilterSchema),
        z.lazy(() => StatusUsuarioSchema),
      ])
      .optional(),
    criadoEm: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    veiculo: z
      .union([
        z.lazy(() => VeiculoNullableScalarRelationFilterSchema),
        z.lazy(() => VeiculoWhereInputSchema),
      ])
      .optional()
      .nullable(),
    atendimentosRegistrados: z
      .lazy(() => AtendimentoListRelationFilterSchema)
      .optional(),
    conversasComoAtendente: z
      .lazy(() => ConversaListRelationFilterSchema)
      .optional(),
    conversasComoMotorista: z
      .lazy(() => ConversaListRelationFilterSchema)
      .optional(),
    mensagensEnviadas: z
      .lazy(() => MensagemListRelationFilterSchema)
      .optional(),
  });

export const UsuarioOrderByWithRelationInputSchema: z.ZodType<Prisma.UsuarioOrderByWithRelationInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    email: z.lazy(() => SortOrderSchema).optional(),
    senha: z.lazy(() => SortOrderSchema).optional(),
    tipo: z.lazy(() => SortOrderSchema).optional(),
    telefone: z.lazy(() => SortOrderSchema).optional(),
    status: z.lazy(() => SortOrderSchema).optional(),
    criadoEm: z.lazy(() => SortOrderSchema).optional(),
    veiculo: z.lazy(() => VeiculoOrderByWithRelationInputSchema).optional(),
    atendimentosRegistrados: z
      .lazy(() => AtendimentoOrderByRelationAggregateInputSchema)
      .optional(),
    conversasComoAtendente: z
      .lazy(() => ConversaOrderByRelationAggregateInputSchema)
      .optional(),
    conversasComoMotorista: z
      .lazy(() => ConversaOrderByRelationAggregateInputSchema)
      .optional(),
    mensagensEnviadas: z
      .lazy(() => MensagemOrderByRelationAggregateInputSchema)
      .optional(),
  });

export const UsuarioWhereUniqueInputSchema: z.ZodType<Prisma.UsuarioWhereUniqueInput> =
  z
    .union([
      z.object({
        id: z.uuid(),
        email: z.string(),
      }),
      z.object({
        id: z.uuid(),
      }),
      z.object({
        email: z.string(),
      }),
    ])
    .and(
      z.strictObject({
        id: z.uuid().optional(),
        email: z.string().optional(),
        AND: z
          .union([
            z.lazy(() => UsuarioWhereInputSchema),
            z.lazy(() => UsuarioWhereInputSchema).array(),
          ])
          .optional(),
        OR: z
          .lazy(() => UsuarioWhereInputSchema)
          .array()
          .optional(),
        NOT: z
          .union([
            z.lazy(() => UsuarioWhereInputSchema),
            z.lazy(() => UsuarioWhereInputSchema).array(),
          ])
          .optional(),
        senha: z
          .union([z.lazy(() => StringFilterSchema), z.string()])
          .optional(),
        tipo: z
          .union([
            z.lazy(() => EnumTipoUsuarioFilterSchema),
            z.lazy(() => TipoUsuarioSchema),
          ])
          .optional(),
        telefone: z
          .union([z.lazy(() => StringFilterSchema), z.string()])
          .optional(),
        status: z
          .union([
            z.lazy(() => EnumStatusUsuarioFilterSchema),
            z.lazy(() => StatusUsuarioSchema),
          ])
          .optional(),
        criadoEm: z
          .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
          .optional(),
        veiculo: z
          .union([
            z.lazy(() => VeiculoNullableScalarRelationFilterSchema),
            z.lazy(() => VeiculoWhereInputSchema),
          ])
          .optional()
          .nullable(),
        atendimentosRegistrados: z
          .lazy(() => AtendimentoListRelationFilterSchema)
          .optional(),
        conversasComoAtendente: z
          .lazy(() => ConversaListRelationFilterSchema)
          .optional(),
        conversasComoMotorista: z
          .lazy(() => ConversaListRelationFilterSchema)
          .optional(),
        mensagensEnviadas: z
          .lazy(() => MensagemListRelationFilterSchema)
          .optional(),
      }),
    );

export const UsuarioOrderByWithAggregationInputSchema: z.ZodType<Prisma.UsuarioOrderByWithAggregationInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    email: z.lazy(() => SortOrderSchema).optional(),
    senha: z.lazy(() => SortOrderSchema).optional(),
    tipo: z.lazy(() => SortOrderSchema).optional(),
    telefone: z.lazy(() => SortOrderSchema).optional(),
    status: z.lazy(() => SortOrderSchema).optional(),
    criadoEm: z.lazy(() => SortOrderSchema).optional(),
    _count: z.lazy(() => UsuarioCountOrderByAggregateInputSchema).optional(),
    _max: z.lazy(() => UsuarioMaxOrderByAggregateInputSchema).optional(),
    _min: z.lazy(() => UsuarioMinOrderByAggregateInputSchema).optional(),
  });

export const UsuarioScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UsuarioScalarWhereWithAggregatesInput> =
  z.strictObject({
    AND: z
      .union([
        z.lazy(() => UsuarioScalarWhereWithAggregatesInputSchema),
        z.lazy(() => UsuarioScalarWhereWithAggregatesInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => UsuarioScalarWhereWithAggregatesInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => UsuarioScalarWhereWithAggregatesInputSchema),
        z.lazy(() => UsuarioScalarWhereWithAggregatesInputSchema).array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
    email: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
    senha: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
    tipo: z
      .union([
        z.lazy(() => EnumTipoUsuarioWithAggregatesFilterSchema),
        z.lazy(() => TipoUsuarioSchema),
      ])
      .optional(),
    telefone: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
    status: z
      .union([
        z.lazy(() => EnumStatusUsuarioWithAggregatesFilterSchema),
        z.lazy(() => StatusUsuarioSchema),
      ])
      .optional(),
    criadoEm: z
      .union([
        z.lazy(() => DateTimeWithAggregatesFilterSchema),
        z.coerce.date(),
      ])
      .optional(),
  });

export const VeiculoWhereInputSchema: z.ZodType<Prisma.VeiculoWhereInput> =
  z.strictObject({
    AND: z
      .union([
        z.lazy(() => VeiculoWhereInputSchema),
        z.lazy(() => VeiculoWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => VeiculoWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => VeiculoWhereInputSchema),
        z.lazy(() => VeiculoWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    placa: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    latitude: z.union([z.lazy(() => FloatFilterSchema), z.number()]).optional(),
    longitude: z
      .union([z.lazy(() => FloatFilterSchema), z.number()])
      .optional(),
    motoristaId: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    motorista: z
      .union([
        z.lazy(() => UsuarioScalarRelationFilterSchema),
        z.lazy(() => UsuarioWhereInputSchema),
      ])
      .optional(),
    atendimentos: z
      .lazy(() => VeiculoAtendimentoListRelationFilterSchema)
      .optional(),
  });

export const VeiculoOrderByWithRelationInputSchema: z.ZodType<Prisma.VeiculoOrderByWithRelationInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    placa: z.lazy(() => SortOrderSchema).optional(),
    latitude: z.lazy(() => SortOrderSchema).optional(),
    longitude: z.lazy(() => SortOrderSchema).optional(),
    motoristaId: z.lazy(() => SortOrderSchema).optional(),
    motorista: z.lazy(() => UsuarioOrderByWithRelationInputSchema).optional(),
    atendimentos: z
      .lazy(() => VeiculoAtendimentoOrderByRelationAggregateInputSchema)
      .optional(),
  });

export const VeiculoWhereUniqueInputSchema: z.ZodType<Prisma.VeiculoWhereUniqueInput> =
  z
    .union([
      z.object({
        id: z.uuid(),
        placa: z.string(),
        motoristaId: z.string(),
      }),
      z.object({
        id: z.uuid(),
        placa: z.string(),
      }),
      z.object({
        id: z.uuid(),
        motoristaId: z.string(),
      }),
      z.object({
        id: z.uuid(),
      }),
      z.object({
        placa: z.string(),
        motoristaId: z.string(),
      }),
      z.object({
        placa: z.string(),
      }),
      z.object({
        motoristaId: z.string(),
      }),
    ])
    .and(
      z.strictObject({
        id: z.uuid().optional(),
        placa: z.string().optional(),
        motoristaId: z.string().optional(),
        AND: z
          .union([
            z.lazy(() => VeiculoWhereInputSchema),
            z.lazy(() => VeiculoWhereInputSchema).array(),
          ])
          .optional(),
        OR: z
          .lazy(() => VeiculoWhereInputSchema)
          .array()
          .optional(),
        NOT: z
          .union([
            z.lazy(() => VeiculoWhereInputSchema),
            z.lazy(() => VeiculoWhereInputSchema).array(),
          ])
          .optional(),
        latitude: z
          .union([z.lazy(() => FloatFilterSchema), z.number()])
          .optional(),
        longitude: z
          .union([z.lazy(() => FloatFilterSchema), z.number()])
          .optional(),
        motorista: z
          .union([
            z.lazy(() => UsuarioScalarRelationFilterSchema),
            z.lazy(() => UsuarioWhereInputSchema),
          ])
          .optional(),
        atendimentos: z
          .lazy(() => VeiculoAtendimentoListRelationFilterSchema)
          .optional(),
      }),
    );

export const VeiculoOrderByWithAggregationInputSchema: z.ZodType<Prisma.VeiculoOrderByWithAggregationInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    placa: z.lazy(() => SortOrderSchema).optional(),
    latitude: z.lazy(() => SortOrderSchema).optional(),
    longitude: z.lazy(() => SortOrderSchema).optional(),
    motoristaId: z.lazy(() => SortOrderSchema).optional(),
    _count: z.lazy(() => VeiculoCountOrderByAggregateInputSchema).optional(),
    _avg: z.lazy(() => VeiculoAvgOrderByAggregateInputSchema).optional(),
    _max: z.lazy(() => VeiculoMaxOrderByAggregateInputSchema).optional(),
    _min: z.lazy(() => VeiculoMinOrderByAggregateInputSchema).optional(),
    _sum: z.lazy(() => VeiculoSumOrderByAggregateInputSchema).optional(),
  });

export const VeiculoScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.VeiculoScalarWhereWithAggregatesInput> =
  z.strictObject({
    AND: z
      .union([
        z.lazy(() => VeiculoScalarWhereWithAggregatesInputSchema),
        z.lazy(() => VeiculoScalarWhereWithAggregatesInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => VeiculoScalarWhereWithAggregatesInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => VeiculoScalarWhereWithAggregatesInputSchema),
        z.lazy(() => VeiculoScalarWhereWithAggregatesInputSchema).array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
    placa: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
    latitude: z
      .union([z.lazy(() => FloatWithAggregatesFilterSchema), z.number()])
      .optional(),
    longitude: z
      .union([z.lazy(() => FloatWithAggregatesFilterSchema), z.number()])
      .optional(),
    motoristaId: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
  });

export const AtendimentoWhereInputSchema: z.ZodType<Prisma.AtendimentoWhereInput> =
  z.strictObject({
    AND: z
      .union([
        z.lazy(() => AtendimentoWhereInputSchema),
        z.lazy(() => AtendimentoWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => AtendimentoWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => AtendimentoWhereInputSchema),
        z.lazy(() => AtendimentoWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    protocolo: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    endereco: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    localDeRetorno: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    oQueAconteceu: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    estadoDoPaciente: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    idadeAparente: z
      .union([z.lazy(() => IntNullableFilterSchema), z.number()])
      .optional()
      .nullable(),
    quantidadeDePacientes: z
      .union([z.lazy(() => IntFilterSchema), z.number()])
      .optional(),
    estadoDaLesao: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    observacoes: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    atendenteId: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    criadoEm: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    atendente: z
      .union([
        z.lazy(() => UsuarioScalarRelationFilterSchema),
        z.lazy(() => UsuarioWhereInputSchema),
      ])
      .optional(),
    veiculos: z
      .lazy(() => VeiculoAtendimentoListRelationFilterSchema)
      .optional(),
    notificacoes: z.lazy(() => NotificacaoListRelationFilterSchema).optional(),
  });

export const AtendimentoOrderByWithRelationInputSchema: z.ZodType<Prisma.AtendimentoOrderByWithRelationInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    protocolo: z.lazy(() => SortOrderSchema).optional(),
    endereco: z.lazy(() => SortOrderSchema).optional(),
    localDeRetorno: z.lazy(() => SortOrderSchema).optional(),
    oQueAconteceu: z.lazy(() => SortOrderSchema).optional(),
    estadoDoPaciente: z.lazy(() => SortOrderSchema).optional(),
    idadeAparente: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputSchema),
      ])
      .optional(),
    quantidadeDePacientes: z.lazy(() => SortOrderSchema).optional(),
    estadoDaLesao: z.lazy(() => SortOrderSchema).optional(),
    observacoes: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputSchema),
      ])
      .optional(),
    atendenteId: z.lazy(() => SortOrderSchema).optional(),
    criadoEm: z.lazy(() => SortOrderSchema).optional(),
    atendente: z.lazy(() => UsuarioOrderByWithRelationInputSchema).optional(),
    veiculos: z
      .lazy(() => VeiculoAtendimentoOrderByRelationAggregateInputSchema)
      .optional(),
    notificacoes: z
      .lazy(() => NotificacaoOrderByRelationAggregateInputSchema)
      .optional(),
  });

export const AtendimentoWhereUniqueInputSchema: z.ZodType<Prisma.AtendimentoWhereUniqueInput> =
  z
    .union([
      z.object({
        id: z.uuid(),
        protocolo: z.string(),
      }),
      z.object({
        id: z.uuid(),
      }),
      z.object({
        protocolo: z.string(),
      }),
    ])
    .and(
      z.strictObject({
        id: z.uuid().optional(),
        protocolo: z.string().optional(),
        AND: z
          .union([
            z.lazy(() => AtendimentoWhereInputSchema),
            z.lazy(() => AtendimentoWhereInputSchema).array(),
          ])
          .optional(),
        OR: z
          .lazy(() => AtendimentoWhereInputSchema)
          .array()
          .optional(),
        NOT: z
          .union([
            z.lazy(() => AtendimentoWhereInputSchema),
            z.lazy(() => AtendimentoWhereInputSchema).array(),
          ])
          .optional(),
        endereco: z
          .union([z.lazy(() => StringFilterSchema), z.string()])
          .optional(),
        localDeRetorno: z
          .union([z.lazy(() => StringFilterSchema), z.string()])
          .optional(),
        oQueAconteceu: z
          .union([z.lazy(() => StringFilterSchema), z.string()])
          .optional(),
        estadoDoPaciente: z
          .union([z.lazy(() => StringFilterSchema), z.string()])
          .optional(),
        idadeAparente: z
          .union([z.lazy(() => IntNullableFilterSchema), z.number().int()])
          .optional()
          .nullable(),
        quantidadeDePacientes: z
          .union([z.lazy(() => IntFilterSchema), z.number().int()])
          .optional(),
        estadoDaLesao: z
          .union([z.lazy(() => StringFilterSchema), z.string()])
          .optional(),
        observacoes: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        atendenteId: z
          .union([z.lazy(() => StringFilterSchema), z.string()])
          .optional(),
        criadoEm: z
          .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
          .optional(),
        atendente: z
          .union([
            z.lazy(() => UsuarioScalarRelationFilterSchema),
            z.lazy(() => UsuarioWhereInputSchema),
          ])
          .optional(),
        veiculos: z
          .lazy(() => VeiculoAtendimentoListRelationFilterSchema)
          .optional(),
        notificacoes: z
          .lazy(() => NotificacaoListRelationFilterSchema)
          .optional(),
      }),
    );

export const AtendimentoOrderByWithAggregationInputSchema: z.ZodType<Prisma.AtendimentoOrderByWithAggregationInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    protocolo: z.lazy(() => SortOrderSchema).optional(),
    endereco: z.lazy(() => SortOrderSchema).optional(),
    localDeRetorno: z.lazy(() => SortOrderSchema).optional(),
    oQueAconteceu: z.lazy(() => SortOrderSchema).optional(),
    estadoDoPaciente: z.lazy(() => SortOrderSchema).optional(),
    idadeAparente: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputSchema),
      ])
      .optional(),
    quantidadeDePacientes: z.lazy(() => SortOrderSchema).optional(),
    estadoDaLesao: z.lazy(() => SortOrderSchema).optional(),
    observacoes: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputSchema),
      ])
      .optional(),
    atendenteId: z.lazy(() => SortOrderSchema).optional(),
    criadoEm: z.lazy(() => SortOrderSchema).optional(),
    _count: z
      .lazy(() => AtendimentoCountOrderByAggregateInputSchema)
      .optional(),
    _avg: z.lazy(() => AtendimentoAvgOrderByAggregateInputSchema).optional(),
    _max: z.lazy(() => AtendimentoMaxOrderByAggregateInputSchema).optional(),
    _min: z.lazy(() => AtendimentoMinOrderByAggregateInputSchema).optional(),
    _sum: z.lazy(() => AtendimentoSumOrderByAggregateInputSchema).optional(),
  });

export const AtendimentoScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AtendimentoScalarWhereWithAggregatesInput> =
  z.strictObject({
    AND: z
      .union([
        z.lazy(() => AtendimentoScalarWhereWithAggregatesInputSchema),
        z.lazy(() => AtendimentoScalarWhereWithAggregatesInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => AtendimentoScalarWhereWithAggregatesInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => AtendimentoScalarWhereWithAggregatesInputSchema),
        z.lazy(() => AtendimentoScalarWhereWithAggregatesInputSchema).array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
    protocolo: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
    endereco: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
    localDeRetorno: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
    oQueAconteceu: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
    estadoDoPaciente: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
    idadeAparente: z
      .union([z.lazy(() => IntNullableWithAggregatesFilterSchema), z.number()])
      .optional()
      .nullable(),
    quantidadeDePacientes: z
      .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
      .optional(),
    estadoDaLesao: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
    observacoes: z
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
    atendenteId: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
    criadoEm: z
      .union([
        z.lazy(() => DateTimeWithAggregatesFilterSchema),
        z.coerce.date(),
      ])
      .optional(),
  });

export const VeiculoAtendimentoWhereInputSchema: z.ZodType<Prisma.VeiculoAtendimentoWhereInput> =
  z.strictObject({
    AND: z
      .union([
        z.lazy(() => VeiculoAtendimentoWhereInputSchema),
        z.lazy(() => VeiculoAtendimentoWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => VeiculoAtendimentoWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => VeiculoAtendimentoWhereInputSchema),
        z.lazy(() => VeiculoAtendimentoWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    status: z
      .union([
        z.lazy(() => EnumStatusAtendimentoFilterSchema),
        z.lazy(() => StatusAtendimentoSchema),
      ])
      .optional(),
    veiculoId: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    atendimentoId: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    veiculo: z
      .union([
        z.lazy(() => VeiculoScalarRelationFilterSchema),
        z.lazy(() => VeiculoWhereInputSchema),
      ])
      .optional(),
    atendimento: z
      .union([
        z.lazy(() => AtendimentoScalarRelationFilterSchema),
        z.lazy(() => AtendimentoWhereInputSchema),
      ])
      .optional(),
  });

export const VeiculoAtendimentoOrderByWithRelationInputSchema: z.ZodType<Prisma.VeiculoAtendimentoOrderByWithRelationInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    status: z.lazy(() => SortOrderSchema).optional(),
    veiculoId: z.lazy(() => SortOrderSchema).optional(),
    atendimentoId: z.lazy(() => SortOrderSchema).optional(),
    veiculo: z.lazy(() => VeiculoOrderByWithRelationInputSchema).optional(),
    atendimento: z
      .lazy(() => AtendimentoOrderByWithRelationInputSchema)
      .optional(),
  });

export const VeiculoAtendimentoWhereUniqueInputSchema: z.ZodType<Prisma.VeiculoAtendimentoWhereUniqueInput> =
  z
    .object({
      id: z.uuid(),
    })
    .and(
      z.strictObject({
        id: z.uuid().optional(),
        AND: z
          .union([
            z.lazy(() => VeiculoAtendimentoWhereInputSchema),
            z.lazy(() => VeiculoAtendimentoWhereInputSchema).array(),
          ])
          .optional(),
        OR: z
          .lazy(() => VeiculoAtendimentoWhereInputSchema)
          .array()
          .optional(),
        NOT: z
          .union([
            z.lazy(() => VeiculoAtendimentoWhereInputSchema),
            z.lazy(() => VeiculoAtendimentoWhereInputSchema).array(),
          ])
          .optional(),
        status: z
          .union([
            z.lazy(() => EnumStatusAtendimentoFilterSchema),
            z.lazy(() => StatusAtendimentoSchema),
          ])
          .optional(),
        veiculoId: z
          .union([z.lazy(() => StringFilterSchema), z.string()])
          .optional(),
        atendimentoId: z
          .union([z.lazy(() => StringFilterSchema), z.string()])
          .optional(),
        veiculo: z
          .union([
            z.lazy(() => VeiculoScalarRelationFilterSchema),
            z.lazy(() => VeiculoWhereInputSchema),
          ])
          .optional(),
        atendimento: z
          .union([
            z.lazy(() => AtendimentoScalarRelationFilterSchema),
            z.lazy(() => AtendimentoWhereInputSchema),
          ])
          .optional(),
      }),
    );

export const VeiculoAtendimentoOrderByWithAggregationInputSchema: z.ZodType<Prisma.VeiculoAtendimentoOrderByWithAggregationInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    status: z.lazy(() => SortOrderSchema).optional(),
    veiculoId: z.lazy(() => SortOrderSchema).optional(),
    atendimentoId: z.lazy(() => SortOrderSchema).optional(),
    _count: z
      .lazy(() => VeiculoAtendimentoCountOrderByAggregateInputSchema)
      .optional(),
    _max: z
      .lazy(() => VeiculoAtendimentoMaxOrderByAggregateInputSchema)
      .optional(),
    _min: z
      .lazy(() => VeiculoAtendimentoMinOrderByAggregateInputSchema)
      .optional(),
  });

export const VeiculoAtendimentoScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.VeiculoAtendimentoScalarWhereWithAggregatesInput> =
  z.strictObject({
    AND: z
      .union([
        z.lazy(() => VeiculoAtendimentoScalarWhereWithAggregatesInputSchema),
        z
          .lazy(() => VeiculoAtendimentoScalarWhereWithAggregatesInputSchema)
          .array(),
      ])
      .optional(),
    OR: z
      .lazy(() => VeiculoAtendimentoScalarWhereWithAggregatesInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => VeiculoAtendimentoScalarWhereWithAggregatesInputSchema),
        z
          .lazy(() => VeiculoAtendimentoScalarWhereWithAggregatesInputSchema)
          .array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
    status: z
      .union([
        z.lazy(() => EnumStatusAtendimentoWithAggregatesFilterSchema),
        z.lazy(() => StatusAtendimentoSchema),
      ])
      .optional(),
    veiculoId: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
    atendimentoId: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
  });

export const ConversaWhereInputSchema: z.ZodType<Prisma.ConversaWhereInput> =
  z.strictObject({
    AND: z
      .union([
        z.lazy(() => ConversaWhereInputSchema),
        z.lazy(() => ConversaWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => ConversaWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => ConversaWhereInputSchema),
        z.lazy(() => ConversaWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    atendenteId: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    motoristaId: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    atendente: z
      .union([
        z.lazy(() => UsuarioScalarRelationFilterSchema),
        z.lazy(() => UsuarioWhereInputSchema),
      ])
      .optional(),
    motorista: z
      .union([
        z.lazy(() => UsuarioScalarRelationFilterSchema),
        z.lazy(() => UsuarioWhereInputSchema),
      ])
      .optional(),
    mensagens: z.lazy(() => MensagemListRelationFilterSchema).optional(),
  });

export const ConversaOrderByWithRelationInputSchema: z.ZodType<Prisma.ConversaOrderByWithRelationInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    atendenteId: z.lazy(() => SortOrderSchema).optional(),
    motoristaId: z.lazy(() => SortOrderSchema).optional(),
    atendente: z.lazy(() => UsuarioOrderByWithRelationInputSchema).optional(),
    motorista: z.lazy(() => UsuarioOrderByWithRelationInputSchema).optional(),
    mensagens: z
      .lazy(() => MensagemOrderByRelationAggregateInputSchema)
      .optional(),
  });

export const ConversaWhereUniqueInputSchema: z.ZodType<Prisma.ConversaWhereUniqueInput> =
  z
    .object({
      id: z.uuid(),
    })
    .and(
      z.strictObject({
        id: z.uuid().optional(),
        AND: z
          .union([
            z.lazy(() => ConversaWhereInputSchema),
            z.lazy(() => ConversaWhereInputSchema).array(),
          ])
          .optional(),
        OR: z
          .lazy(() => ConversaWhereInputSchema)
          .array()
          .optional(),
        NOT: z
          .union([
            z.lazy(() => ConversaWhereInputSchema),
            z.lazy(() => ConversaWhereInputSchema).array(),
          ])
          .optional(),
        atendenteId: z
          .union([z.lazy(() => StringFilterSchema), z.string()])
          .optional(),
        motoristaId: z
          .union([z.lazy(() => StringFilterSchema), z.string()])
          .optional(),
        atendente: z
          .union([
            z.lazy(() => UsuarioScalarRelationFilterSchema),
            z.lazy(() => UsuarioWhereInputSchema),
          ])
          .optional(),
        motorista: z
          .union([
            z.lazy(() => UsuarioScalarRelationFilterSchema),
            z.lazy(() => UsuarioWhereInputSchema),
          ])
          .optional(),
        mensagens: z.lazy(() => MensagemListRelationFilterSchema).optional(),
      }),
    );

export const ConversaOrderByWithAggregationInputSchema: z.ZodType<Prisma.ConversaOrderByWithAggregationInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    atendenteId: z.lazy(() => SortOrderSchema).optional(),
    motoristaId: z.lazy(() => SortOrderSchema).optional(),
    _count: z.lazy(() => ConversaCountOrderByAggregateInputSchema).optional(),
    _max: z.lazy(() => ConversaMaxOrderByAggregateInputSchema).optional(),
    _min: z.lazy(() => ConversaMinOrderByAggregateInputSchema).optional(),
  });

export const ConversaScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ConversaScalarWhereWithAggregatesInput> =
  z.strictObject({
    AND: z
      .union([
        z.lazy(() => ConversaScalarWhereWithAggregatesInputSchema),
        z.lazy(() => ConversaScalarWhereWithAggregatesInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => ConversaScalarWhereWithAggregatesInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => ConversaScalarWhereWithAggregatesInputSchema),
        z.lazy(() => ConversaScalarWhereWithAggregatesInputSchema).array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
    atendenteId: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
    motoristaId: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
  });

export const MensagemWhereInputSchema: z.ZodType<Prisma.MensagemWhereInput> =
  z.strictObject({
    AND: z
      .union([
        z.lazy(() => MensagemWhereInputSchema),
        z.lazy(() => MensagemWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => MensagemWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => MensagemWhereInputSchema),
        z.lazy(() => MensagemWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    texto: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    dataDeEnvio: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    quemMandouId: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    conversaId: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    quemMandou: z
      .union([
        z.lazy(() => UsuarioScalarRelationFilterSchema),
        z.lazy(() => UsuarioWhereInputSchema),
      ])
      .optional(),
    conversa: z
      .union([
        z.lazy(() => ConversaScalarRelationFilterSchema),
        z.lazy(() => ConversaWhereInputSchema),
      ])
      .optional(),
  });

export const MensagemOrderByWithRelationInputSchema: z.ZodType<Prisma.MensagemOrderByWithRelationInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    texto: z.lazy(() => SortOrderSchema).optional(),
    dataDeEnvio: z.lazy(() => SortOrderSchema).optional(),
    quemMandouId: z.lazy(() => SortOrderSchema).optional(),
    conversaId: z.lazy(() => SortOrderSchema).optional(),
    quemMandou: z.lazy(() => UsuarioOrderByWithRelationInputSchema).optional(),
    conversa: z.lazy(() => ConversaOrderByWithRelationInputSchema).optional(),
  });

export const MensagemWhereUniqueInputSchema: z.ZodType<Prisma.MensagemWhereUniqueInput> =
  z
    .object({
      id: z.uuid(),
    })
    .and(
      z.strictObject({
        id: z.uuid().optional(),
        AND: z
          .union([
            z.lazy(() => MensagemWhereInputSchema),
            z.lazy(() => MensagemWhereInputSchema).array(),
          ])
          .optional(),
        OR: z
          .lazy(() => MensagemWhereInputSchema)
          .array()
          .optional(),
        NOT: z
          .union([
            z.lazy(() => MensagemWhereInputSchema),
            z.lazy(() => MensagemWhereInputSchema).array(),
          ])
          .optional(),
        texto: z
          .union([z.lazy(() => StringFilterSchema), z.string()])
          .optional(),
        dataDeEnvio: z
          .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
          .optional(),
        quemMandouId: z
          .union([z.lazy(() => StringFilterSchema), z.string()])
          .optional(),
        conversaId: z
          .union([z.lazy(() => StringFilterSchema), z.string()])
          .optional(),
        quemMandou: z
          .union([
            z.lazy(() => UsuarioScalarRelationFilterSchema),
            z.lazy(() => UsuarioWhereInputSchema),
          ])
          .optional(),
        conversa: z
          .union([
            z.lazy(() => ConversaScalarRelationFilterSchema),
            z.lazy(() => ConversaWhereInputSchema),
          ])
          .optional(),
      }),
    );

export const MensagemOrderByWithAggregationInputSchema: z.ZodType<Prisma.MensagemOrderByWithAggregationInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    texto: z.lazy(() => SortOrderSchema).optional(),
    dataDeEnvio: z.lazy(() => SortOrderSchema).optional(),
    quemMandouId: z.lazy(() => SortOrderSchema).optional(),
    conversaId: z.lazy(() => SortOrderSchema).optional(),
    _count: z.lazy(() => MensagemCountOrderByAggregateInputSchema).optional(),
    _max: z.lazy(() => MensagemMaxOrderByAggregateInputSchema).optional(),
    _min: z.lazy(() => MensagemMinOrderByAggregateInputSchema).optional(),
  });

export const MensagemScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.MensagemScalarWhereWithAggregatesInput> =
  z.strictObject({
    AND: z
      .union([
        z.lazy(() => MensagemScalarWhereWithAggregatesInputSchema),
        z.lazy(() => MensagemScalarWhereWithAggregatesInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => MensagemScalarWhereWithAggregatesInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => MensagemScalarWhereWithAggregatesInputSchema),
        z.lazy(() => MensagemScalarWhereWithAggregatesInputSchema).array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
    texto: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
    dataDeEnvio: z
      .union([
        z.lazy(() => DateTimeWithAggregatesFilterSchema),
        z.coerce.date(),
      ])
      .optional(),
    quemMandouId: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
    conversaId: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
  });

export const NotificacaoWhereInputSchema: z.ZodType<Prisma.NotificacaoWhereInput> =
  z.strictObject({
    AND: z
      .union([
        z.lazy(() => NotificacaoWhereInputSchema),
        z.lazy(() => NotificacaoWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => NotificacaoWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => NotificacaoWhereInputSchema),
        z.lazy(() => NotificacaoWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    mensagem: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    dataDaNotificacao: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    atendimentoId: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    atendimento: z
      .union([
        z.lazy(() => AtendimentoScalarRelationFilterSchema),
        z.lazy(() => AtendimentoWhereInputSchema),
      ])
      .optional(),
  });

export const NotificacaoOrderByWithRelationInputSchema: z.ZodType<Prisma.NotificacaoOrderByWithRelationInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    mensagem: z.lazy(() => SortOrderSchema).optional(),
    dataDaNotificacao: z.lazy(() => SortOrderSchema).optional(),
    atendimentoId: z.lazy(() => SortOrderSchema).optional(),
    atendimento: z
      .lazy(() => AtendimentoOrderByWithRelationInputSchema)
      .optional(),
  });

export const NotificacaoWhereUniqueInputSchema: z.ZodType<Prisma.NotificacaoWhereUniqueInput> =
  z
    .object({
      id: z.uuid(),
    })
    .and(
      z.strictObject({
        id: z.uuid().optional(),
        AND: z
          .union([
            z.lazy(() => NotificacaoWhereInputSchema),
            z.lazy(() => NotificacaoWhereInputSchema).array(),
          ])
          .optional(),
        OR: z
          .lazy(() => NotificacaoWhereInputSchema)
          .array()
          .optional(),
        NOT: z
          .union([
            z.lazy(() => NotificacaoWhereInputSchema),
            z.lazy(() => NotificacaoWhereInputSchema).array(),
          ])
          .optional(),
        mensagem: z
          .union([z.lazy(() => StringFilterSchema), z.string()])
          .optional(),
        dataDaNotificacao: z
          .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
          .optional(),
        atendimentoId: z
          .union([z.lazy(() => StringFilterSchema), z.string()])
          .optional(),
        atendimento: z
          .union([
            z.lazy(() => AtendimentoScalarRelationFilterSchema),
            z.lazy(() => AtendimentoWhereInputSchema),
          ])
          .optional(),
      }),
    );

export const NotificacaoOrderByWithAggregationInputSchema: z.ZodType<Prisma.NotificacaoOrderByWithAggregationInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    mensagem: z.lazy(() => SortOrderSchema).optional(),
    dataDaNotificacao: z.lazy(() => SortOrderSchema).optional(),
    atendimentoId: z.lazy(() => SortOrderSchema).optional(),
    _count: z
      .lazy(() => NotificacaoCountOrderByAggregateInputSchema)
      .optional(),
    _max: z.lazy(() => NotificacaoMaxOrderByAggregateInputSchema).optional(),
    _min: z.lazy(() => NotificacaoMinOrderByAggregateInputSchema).optional(),
  });

export const NotificacaoScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.NotificacaoScalarWhereWithAggregatesInput> =
  z.strictObject({
    AND: z
      .union([
        z.lazy(() => NotificacaoScalarWhereWithAggregatesInputSchema),
        z.lazy(() => NotificacaoScalarWhereWithAggregatesInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => NotificacaoScalarWhereWithAggregatesInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => NotificacaoScalarWhereWithAggregatesInputSchema),
        z.lazy(() => NotificacaoScalarWhereWithAggregatesInputSchema).array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
    mensagem: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
    dataDaNotificacao: z
      .union([
        z.lazy(() => DateTimeWithAggregatesFilterSchema),
        z.coerce.date(),
      ])
      .optional(),
    atendimentoId: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
  });

export const UsuarioCreateInputSchema: z.ZodType<Prisma.UsuarioCreateInput> =
  z.strictObject({
    id: z.uuid().optional(),
    email: z.string(),
    senha: z.string(),
    tipo: z.lazy(() => TipoUsuarioSchema),
    telefone: z.string(),
    status: z.lazy(() => StatusUsuarioSchema).optional(),
    criadoEm: z.coerce.date().optional(),
    veiculo: z
      .lazy(() => VeiculoCreateNestedOneWithoutMotoristaInputSchema)
      .optional(),
    atendimentosRegistrados: z
      .lazy(() => AtendimentoCreateNestedManyWithoutAtendenteInputSchema)
      .optional(),
    conversasComoAtendente: z
      .lazy(() => ConversaCreateNestedManyWithoutAtendenteInputSchema)
      .optional(),
    conversasComoMotorista: z
      .lazy(() => ConversaCreateNestedManyWithoutMotoristaInputSchema)
      .optional(),
    mensagensEnviadas: z
      .lazy(() => MensagemCreateNestedManyWithoutQuemMandouInputSchema)
      .optional(),
  });

export const UsuarioUncheckedCreateInputSchema: z.ZodType<Prisma.UsuarioUncheckedCreateInput> =
  z.strictObject({
    id: z.uuid().optional(),
    email: z.string(),
    senha: z.string(),
    tipo: z.lazy(() => TipoUsuarioSchema),
    telefone: z.string(),
    status: z.lazy(() => StatusUsuarioSchema).optional(),
    criadoEm: z.coerce.date().optional(),
    veiculo: z
      .lazy(() => VeiculoUncheckedCreateNestedOneWithoutMotoristaInputSchema)
      .optional(),
    atendimentosRegistrados: z
      .lazy(
        () => AtendimentoUncheckedCreateNestedManyWithoutAtendenteInputSchema,
      )
      .optional(),
    conversasComoAtendente: z
      .lazy(() => ConversaUncheckedCreateNestedManyWithoutAtendenteInputSchema)
      .optional(),
    conversasComoMotorista: z
      .lazy(() => ConversaUncheckedCreateNestedManyWithoutMotoristaInputSchema)
      .optional(),
    mensagensEnviadas: z
      .lazy(() => MensagemUncheckedCreateNestedManyWithoutQuemMandouInputSchema)
      .optional(),
  });

export const UsuarioUpdateInputSchema: z.ZodType<Prisma.UsuarioUpdateInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    email: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    senha: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    tipo: z
      .union([
        z.lazy(() => TipoUsuarioSchema),
        z.lazy(() => EnumTipoUsuarioFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    telefone: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    status: z
      .union([
        z.lazy(() => StatusUsuarioSchema),
        z.lazy(() => EnumStatusUsuarioFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    criadoEm: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    veiculo: z
      .lazy(() => VeiculoUpdateOneWithoutMotoristaNestedInputSchema)
      .optional(),
    atendimentosRegistrados: z
      .lazy(() => AtendimentoUpdateManyWithoutAtendenteNestedInputSchema)
      .optional(),
    conversasComoAtendente: z
      .lazy(() => ConversaUpdateManyWithoutAtendenteNestedInputSchema)
      .optional(),
    conversasComoMotorista: z
      .lazy(() => ConversaUpdateManyWithoutMotoristaNestedInputSchema)
      .optional(),
    mensagensEnviadas: z
      .lazy(() => MensagemUpdateManyWithoutQuemMandouNestedInputSchema)
      .optional(),
  });

export const UsuarioUncheckedUpdateInputSchema: z.ZodType<Prisma.UsuarioUncheckedUpdateInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    email: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    senha: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    tipo: z
      .union([
        z.lazy(() => TipoUsuarioSchema),
        z.lazy(() => EnumTipoUsuarioFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    telefone: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    status: z
      .union([
        z.lazy(() => StatusUsuarioSchema),
        z.lazy(() => EnumStatusUsuarioFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    criadoEm: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    veiculo: z
      .lazy(() => VeiculoUncheckedUpdateOneWithoutMotoristaNestedInputSchema)
      .optional(),
    atendimentosRegistrados: z
      .lazy(
        () => AtendimentoUncheckedUpdateManyWithoutAtendenteNestedInputSchema,
      )
      .optional(),
    conversasComoAtendente: z
      .lazy(() => ConversaUncheckedUpdateManyWithoutAtendenteNestedInputSchema)
      .optional(),
    conversasComoMotorista: z
      .lazy(() => ConversaUncheckedUpdateManyWithoutMotoristaNestedInputSchema)
      .optional(),
    mensagensEnviadas: z
      .lazy(() => MensagemUncheckedUpdateManyWithoutQuemMandouNestedInputSchema)
      .optional(),
  });

export const UsuarioCreateManyInputSchema: z.ZodType<Prisma.UsuarioCreateManyInput> =
  z.strictObject({
    id: z.uuid().optional(),
    email: z.string(),
    senha: z.string(),
    tipo: z.lazy(() => TipoUsuarioSchema),
    telefone: z.string(),
    status: z.lazy(() => StatusUsuarioSchema).optional(),
    criadoEm: z.coerce.date().optional(),
  });

export const UsuarioUpdateManyMutationInputSchema: z.ZodType<Prisma.UsuarioUpdateManyMutationInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    email: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    senha: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    tipo: z
      .union([
        z.lazy(() => TipoUsuarioSchema),
        z.lazy(() => EnumTipoUsuarioFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    telefone: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    status: z
      .union([
        z.lazy(() => StatusUsuarioSchema),
        z.lazy(() => EnumStatusUsuarioFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    criadoEm: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const UsuarioUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UsuarioUncheckedUpdateManyInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    email: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    senha: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    tipo: z
      .union([
        z.lazy(() => TipoUsuarioSchema),
        z.lazy(() => EnumTipoUsuarioFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    telefone: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    status: z
      .union([
        z.lazy(() => StatusUsuarioSchema),
        z.lazy(() => EnumStatusUsuarioFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    criadoEm: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const VeiculoCreateInputSchema: z.ZodType<Prisma.VeiculoCreateInput> =
  z.strictObject({
    id: z.uuid().optional(),
    placa: z.string(),
    latitude: z.number(),
    longitude: z.number(),
    motorista: z.lazy(() => UsuarioCreateNestedOneWithoutVeiculoInputSchema),
    atendimentos: z
      .lazy(() => VeiculoAtendimentoCreateNestedManyWithoutVeiculoInputSchema)
      .optional(),
  });

export const VeiculoUncheckedCreateInputSchema: z.ZodType<Prisma.VeiculoUncheckedCreateInput> =
  z.strictObject({
    id: z.uuid().optional(),
    placa: z.string(),
    latitude: z.number(),
    longitude: z.number(),
    motoristaId: z.string(),
    atendimentos: z
      .lazy(
        () =>
          VeiculoAtendimentoUncheckedCreateNestedManyWithoutVeiculoInputSchema,
      )
      .optional(),
  });

export const VeiculoUpdateInputSchema: z.ZodType<Prisma.VeiculoUpdateInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    placa: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    latitude: z
      .union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)])
      .optional(),
    longitude: z
      .union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)])
      .optional(),
    motorista: z
      .lazy(() => UsuarioUpdateOneRequiredWithoutVeiculoNestedInputSchema)
      .optional(),
    atendimentos: z
      .lazy(() => VeiculoAtendimentoUpdateManyWithoutVeiculoNestedInputSchema)
      .optional(),
  });

export const VeiculoUncheckedUpdateInputSchema: z.ZodType<Prisma.VeiculoUncheckedUpdateInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    placa: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    latitude: z
      .union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)])
      .optional(),
    longitude: z
      .union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)])
      .optional(),
    motoristaId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    atendimentos: z
      .lazy(
        () =>
          VeiculoAtendimentoUncheckedUpdateManyWithoutVeiculoNestedInputSchema,
      )
      .optional(),
  });

export const VeiculoCreateManyInputSchema: z.ZodType<Prisma.VeiculoCreateManyInput> =
  z.strictObject({
    id: z.uuid().optional(),
    placa: z.string(),
    latitude: z.number(),
    longitude: z.number(),
    motoristaId: z.string(),
  });

export const VeiculoUpdateManyMutationInputSchema: z.ZodType<Prisma.VeiculoUpdateManyMutationInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    placa: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    latitude: z
      .union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)])
      .optional(),
    longitude: z
      .union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)])
      .optional(),
  });

export const VeiculoUncheckedUpdateManyInputSchema: z.ZodType<Prisma.VeiculoUncheckedUpdateManyInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    placa: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    latitude: z
      .union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)])
      .optional(),
    longitude: z
      .union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)])
      .optional(),
    motoristaId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
  });

export const AtendimentoCreateInputSchema: z.ZodType<Prisma.AtendimentoCreateInput> =
  z.strictObject({
    id: z.uuid().optional(),
    protocolo: z.string(),
    endereco: z.string(),
    localDeRetorno: z.string(),
    oQueAconteceu: z.string(),
    estadoDoPaciente: z.string(),
    idadeAparente: z.number().int().optional().nullable(),
    quantidadeDePacientes: z.number().int(),
    estadoDaLesao: z.string(),
    observacoes: z.string().optional().nullable(),
    criadoEm: z.coerce.date().optional(),
    atendente: z.lazy(
      () => UsuarioCreateNestedOneWithoutAtendimentosRegistradosInputSchema,
    ),
    veiculos: z
      .lazy(
        () => VeiculoAtendimentoCreateNestedManyWithoutAtendimentoInputSchema,
      )
      .optional(),
    notificacoes: z
      .lazy(() => NotificacaoCreateNestedManyWithoutAtendimentoInputSchema)
      .optional(),
  });

export const AtendimentoUncheckedCreateInputSchema: z.ZodType<Prisma.AtendimentoUncheckedCreateInput> =
  z.strictObject({
    id: z.uuid().optional(),
    protocolo: z.string(),
    endereco: z.string(),
    localDeRetorno: z.string(),
    oQueAconteceu: z.string(),
    estadoDoPaciente: z.string(),
    idadeAparente: z.number().int().optional().nullable(),
    quantidadeDePacientes: z.number().int(),
    estadoDaLesao: z.string(),
    observacoes: z.string().optional().nullable(),
    atendenteId: z.string(),
    criadoEm: z.coerce.date().optional(),
    veiculos: z
      .lazy(
        () =>
          VeiculoAtendimentoUncheckedCreateNestedManyWithoutAtendimentoInputSchema,
      )
      .optional(),
    notificacoes: z
      .lazy(
        () => NotificacaoUncheckedCreateNestedManyWithoutAtendimentoInputSchema,
      )
      .optional(),
  });

export const AtendimentoUpdateInputSchema: z.ZodType<Prisma.AtendimentoUpdateInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    protocolo: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    endereco: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    localDeRetorno: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    oQueAconteceu: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    estadoDoPaciente: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    idadeAparente: z
      .union([
        z.number().int(),
        z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    quantidadeDePacientes: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    estadoDaLesao: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    observacoes: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    criadoEm: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    atendente: z
      .lazy(
        () =>
          UsuarioUpdateOneRequiredWithoutAtendimentosRegistradosNestedInputSchema,
      )
      .optional(),
    veiculos: z
      .lazy(
        () => VeiculoAtendimentoUpdateManyWithoutAtendimentoNestedInputSchema,
      )
      .optional(),
    notificacoes: z
      .lazy(() => NotificacaoUpdateManyWithoutAtendimentoNestedInputSchema)
      .optional(),
  });

export const AtendimentoUncheckedUpdateInputSchema: z.ZodType<Prisma.AtendimentoUncheckedUpdateInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    protocolo: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    endereco: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    localDeRetorno: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    oQueAconteceu: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    estadoDoPaciente: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    idadeAparente: z
      .union([
        z.number().int(),
        z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    quantidadeDePacientes: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    estadoDaLesao: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    observacoes: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    atendenteId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    criadoEm: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    veiculos: z
      .lazy(
        () =>
          VeiculoAtendimentoUncheckedUpdateManyWithoutAtendimentoNestedInputSchema,
      )
      .optional(),
    notificacoes: z
      .lazy(
        () => NotificacaoUncheckedUpdateManyWithoutAtendimentoNestedInputSchema,
      )
      .optional(),
  });

export const AtendimentoCreateManyInputSchema: z.ZodType<Prisma.AtendimentoCreateManyInput> =
  z.strictObject({
    id: z.uuid().optional(),
    protocolo: z.string(),
    endereco: z.string(),
    localDeRetorno: z.string(),
    oQueAconteceu: z.string(),
    estadoDoPaciente: z.string(),
    idadeAparente: z.number().int().optional().nullable(),
    quantidadeDePacientes: z.number().int(),
    estadoDaLesao: z.string(),
    observacoes: z.string().optional().nullable(),
    atendenteId: z.string(),
    criadoEm: z.coerce.date().optional(),
  });

export const AtendimentoUpdateManyMutationInputSchema: z.ZodType<Prisma.AtendimentoUpdateManyMutationInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    protocolo: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    endereco: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    localDeRetorno: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    oQueAconteceu: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    estadoDoPaciente: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    idadeAparente: z
      .union([
        z.number().int(),
        z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    quantidadeDePacientes: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    estadoDaLesao: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    observacoes: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    criadoEm: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const AtendimentoUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AtendimentoUncheckedUpdateManyInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    protocolo: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    endereco: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    localDeRetorno: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    oQueAconteceu: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    estadoDoPaciente: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    idadeAparente: z
      .union([
        z.number().int(),
        z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    quantidadeDePacientes: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    estadoDaLesao: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    observacoes: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    atendenteId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    criadoEm: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const VeiculoAtendimentoCreateInputSchema: z.ZodType<Prisma.VeiculoAtendimentoCreateInput> =
  z.strictObject({
    id: z.uuid().optional(),
    status: z.lazy(() => StatusAtendimentoSchema).optional(),
    veiculo: z.lazy(() => VeiculoCreateNestedOneWithoutAtendimentosInputSchema),
    atendimento: z.lazy(
      () => AtendimentoCreateNestedOneWithoutVeiculosInputSchema,
    ),
  });

export const VeiculoAtendimentoUncheckedCreateInputSchema: z.ZodType<Prisma.VeiculoAtendimentoUncheckedCreateInput> =
  z.strictObject({
    id: z.uuid().optional(),
    status: z.lazy(() => StatusAtendimentoSchema).optional(),
    veiculoId: z.string(),
    atendimentoId: z.string(),
  });

export const VeiculoAtendimentoUpdateInputSchema: z.ZodType<Prisma.VeiculoAtendimentoUpdateInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    status: z
      .union([
        z.lazy(() => StatusAtendimentoSchema),
        z.lazy(() => EnumStatusAtendimentoFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    veiculo: z
      .lazy(() => VeiculoUpdateOneRequiredWithoutAtendimentosNestedInputSchema)
      .optional(),
    atendimento: z
      .lazy(() => AtendimentoUpdateOneRequiredWithoutVeiculosNestedInputSchema)
      .optional(),
  });

export const VeiculoAtendimentoUncheckedUpdateInputSchema: z.ZodType<Prisma.VeiculoAtendimentoUncheckedUpdateInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    status: z
      .union([
        z.lazy(() => StatusAtendimentoSchema),
        z.lazy(() => EnumStatusAtendimentoFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    veiculoId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    atendimentoId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
  });

export const VeiculoAtendimentoCreateManyInputSchema: z.ZodType<Prisma.VeiculoAtendimentoCreateManyInput> =
  z.strictObject({
    id: z.uuid().optional(),
    status: z.lazy(() => StatusAtendimentoSchema).optional(),
    veiculoId: z.string(),
    atendimentoId: z.string(),
  });

export const VeiculoAtendimentoUpdateManyMutationInputSchema: z.ZodType<Prisma.VeiculoAtendimentoUpdateManyMutationInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    status: z
      .union([
        z.lazy(() => StatusAtendimentoSchema),
        z.lazy(() => EnumStatusAtendimentoFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const VeiculoAtendimentoUncheckedUpdateManyInputSchema: z.ZodType<Prisma.VeiculoAtendimentoUncheckedUpdateManyInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    status: z
      .union([
        z.lazy(() => StatusAtendimentoSchema),
        z.lazy(() => EnumStatusAtendimentoFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    veiculoId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    atendimentoId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
  });

export const ConversaCreateInputSchema: z.ZodType<Prisma.ConversaCreateInput> =
  z.strictObject({
    id: z.uuid().optional(),
    atendente: z.lazy(
      () => UsuarioCreateNestedOneWithoutConversasComoAtendenteInputSchema,
    ),
    motorista: z.lazy(
      () => UsuarioCreateNestedOneWithoutConversasComoMotoristaInputSchema,
    ),
    mensagens: z
      .lazy(() => MensagemCreateNestedManyWithoutConversaInputSchema)
      .optional(),
  });

export const ConversaUncheckedCreateInputSchema: z.ZodType<Prisma.ConversaUncheckedCreateInput> =
  z.strictObject({
    id: z.uuid().optional(),
    atendenteId: z.string(),
    motoristaId: z.string(),
    mensagens: z
      .lazy(() => MensagemUncheckedCreateNestedManyWithoutConversaInputSchema)
      .optional(),
  });

export const ConversaUpdateInputSchema: z.ZodType<Prisma.ConversaUpdateInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    atendente: z
      .lazy(
        () =>
          UsuarioUpdateOneRequiredWithoutConversasComoAtendenteNestedInputSchema,
      )
      .optional(),
    motorista: z
      .lazy(
        () =>
          UsuarioUpdateOneRequiredWithoutConversasComoMotoristaNestedInputSchema,
      )
      .optional(),
    mensagens: z
      .lazy(() => MensagemUpdateManyWithoutConversaNestedInputSchema)
      .optional(),
  });

export const ConversaUncheckedUpdateInputSchema: z.ZodType<Prisma.ConversaUncheckedUpdateInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    atendenteId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    motoristaId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    mensagens: z
      .lazy(() => MensagemUncheckedUpdateManyWithoutConversaNestedInputSchema)
      .optional(),
  });

export const ConversaCreateManyInputSchema: z.ZodType<Prisma.ConversaCreateManyInput> =
  z.strictObject({
    id: z.uuid().optional(),
    atendenteId: z.string(),
    motoristaId: z.string(),
  });

export const ConversaUpdateManyMutationInputSchema: z.ZodType<Prisma.ConversaUpdateManyMutationInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
  });

export const ConversaUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ConversaUncheckedUpdateManyInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    atendenteId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    motoristaId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
  });

export const MensagemCreateInputSchema: z.ZodType<Prisma.MensagemCreateInput> =
  z.strictObject({
    id: z.uuid().optional(),
    texto: z.string(),
    dataDeEnvio: z.coerce.date().optional(),
    quemMandou: z.lazy(
      () => UsuarioCreateNestedOneWithoutMensagensEnviadasInputSchema,
    ),
    conversa: z.lazy(() => ConversaCreateNestedOneWithoutMensagensInputSchema),
  });

export const MensagemUncheckedCreateInputSchema: z.ZodType<Prisma.MensagemUncheckedCreateInput> =
  z.strictObject({
    id: z.uuid().optional(),
    texto: z.string(),
    dataDeEnvio: z.coerce.date().optional(),
    quemMandouId: z.string(),
    conversaId: z.string(),
  });

export const MensagemUpdateInputSchema: z.ZodType<Prisma.MensagemUpdateInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    texto: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    dataDeEnvio: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    quemMandou: z
      .lazy(
        () => UsuarioUpdateOneRequiredWithoutMensagensEnviadasNestedInputSchema,
      )
      .optional(),
    conversa: z
      .lazy(() => ConversaUpdateOneRequiredWithoutMensagensNestedInputSchema)
      .optional(),
  });

export const MensagemUncheckedUpdateInputSchema: z.ZodType<Prisma.MensagemUncheckedUpdateInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    texto: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    dataDeEnvio: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    quemMandouId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    conversaId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
  });

export const MensagemCreateManyInputSchema: z.ZodType<Prisma.MensagemCreateManyInput> =
  z.strictObject({
    id: z.uuid().optional(),
    texto: z.string(),
    dataDeEnvio: z.coerce.date().optional(),
    quemMandouId: z.string(),
    conversaId: z.string(),
  });

export const MensagemUpdateManyMutationInputSchema: z.ZodType<Prisma.MensagemUpdateManyMutationInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    texto: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    dataDeEnvio: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const MensagemUncheckedUpdateManyInputSchema: z.ZodType<Prisma.MensagemUncheckedUpdateManyInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    texto: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    dataDeEnvio: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    quemMandouId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    conversaId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
  });

export const NotificacaoCreateInputSchema: z.ZodType<Prisma.NotificacaoCreateInput> =
  z.strictObject({
    id: z.uuid().optional(),
    mensagem: z.string(),
    dataDaNotificacao: z.coerce.date().optional(),
    atendimento: z.lazy(
      () => AtendimentoCreateNestedOneWithoutNotificacoesInputSchema,
    ),
  });

export const NotificacaoUncheckedCreateInputSchema: z.ZodType<Prisma.NotificacaoUncheckedCreateInput> =
  z.strictObject({
    id: z.uuid().optional(),
    mensagem: z.string(),
    dataDaNotificacao: z.coerce.date().optional(),
    atendimentoId: z.string(),
  });

export const NotificacaoUpdateInputSchema: z.ZodType<Prisma.NotificacaoUpdateInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    mensagem: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    dataDaNotificacao: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    atendimento: z
      .lazy(
        () => AtendimentoUpdateOneRequiredWithoutNotificacoesNestedInputSchema,
      )
      .optional(),
  });

export const NotificacaoUncheckedUpdateInputSchema: z.ZodType<Prisma.NotificacaoUncheckedUpdateInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    mensagem: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    dataDaNotificacao: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    atendimentoId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
  });

export const NotificacaoCreateManyInputSchema: z.ZodType<Prisma.NotificacaoCreateManyInput> =
  z.strictObject({
    id: z.uuid().optional(),
    mensagem: z.string(),
    dataDaNotificacao: z.coerce.date().optional(),
    atendimentoId: z.string(),
  });

export const NotificacaoUpdateManyMutationInputSchema: z.ZodType<Prisma.NotificacaoUpdateManyMutationInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    mensagem: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    dataDaNotificacao: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const NotificacaoUncheckedUpdateManyInputSchema: z.ZodType<Prisma.NotificacaoUncheckedUpdateManyInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    mensagem: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    dataDaNotificacao: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    atendimentoId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
  });

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> =
  z.strictObject({
    equals: z.string().optional(),
    in: z.string().array().optional(),
    notIn: z.string().array().optional(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    mode: z.lazy(() => QueryModeSchema).optional(),
    not: z
      .union([z.string(), z.lazy(() => NestedStringFilterSchema)])
      .optional(),
  });

export const EnumTipoUsuarioFilterSchema: z.ZodType<Prisma.EnumTipoUsuarioFilter> =
  z.strictObject({
    equals: z.lazy(() => TipoUsuarioSchema).optional(),
    in: z
      .lazy(() => TipoUsuarioSchema)
      .array()
      .optional(),
    notIn: z
      .lazy(() => TipoUsuarioSchema)
      .array()
      .optional(),
    not: z
      .union([
        z.lazy(() => TipoUsuarioSchema),
        z.lazy(() => NestedEnumTipoUsuarioFilterSchema),
      ])
      .optional(),
  });

export const EnumStatusUsuarioFilterSchema: z.ZodType<Prisma.EnumStatusUsuarioFilter> =
  z.strictObject({
    equals: z.lazy(() => StatusUsuarioSchema).optional(),
    in: z
      .lazy(() => StatusUsuarioSchema)
      .array()
      .optional(),
    notIn: z
      .lazy(() => StatusUsuarioSchema)
      .array()
      .optional(),
    not: z
      .union([
        z.lazy(() => StatusUsuarioSchema),
        z.lazy(() => NestedEnumStatusUsuarioFilterSchema),
      ])
      .optional(),
  });

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> =
  z.strictObject({
    equals: z.coerce.date().optional(),
    in: z.coerce.date().array().optional(),
    notIn: z.coerce.date().array().optional(),
    lt: z.coerce.date().optional(),
    lte: z.coerce.date().optional(),
    gt: z.coerce.date().optional(),
    gte: z.coerce.date().optional(),
    not: z
      .union([z.coerce.date(), z.lazy(() => NestedDateTimeFilterSchema)])
      .optional(),
  });

export const VeiculoNullableScalarRelationFilterSchema: z.ZodType<Prisma.VeiculoNullableScalarRelationFilter> =
  z.strictObject({
    is: z
      .lazy(() => VeiculoWhereInputSchema)
      .optional()
      .nullable(),
    isNot: z
      .lazy(() => VeiculoWhereInputSchema)
      .optional()
      .nullable(),
  });

export const AtendimentoListRelationFilterSchema: z.ZodType<Prisma.AtendimentoListRelationFilter> =
  z.strictObject({
    every: z.lazy(() => AtendimentoWhereInputSchema).optional(),
    some: z.lazy(() => AtendimentoWhereInputSchema).optional(),
    none: z.lazy(() => AtendimentoWhereInputSchema).optional(),
  });

export const ConversaListRelationFilterSchema: z.ZodType<Prisma.ConversaListRelationFilter> =
  z.strictObject({
    every: z.lazy(() => ConversaWhereInputSchema).optional(),
    some: z.lazy(() => ConversaWhereInputSchema).optional(),
    none: z.lazy(() => ConversaWhereInputSchema).optional(),
  });

export const MensagemListRelationFilterSchema: z.ZodType<Prisma.MensagemListRelationFilter> =
  z.strictObject({
    every: z.lazy(() => MensagemWhereInputSchema).optional(),
    some: z.lazy(() => MensagemWhereInputSchema).optional(),
    none: z.lazy(() => MensagemWhereInputSchema).optional(),
  });

export const AtendimentoOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AtendimentoOrderByRelationAggregateInput> =
  z.strictObject({
    _count: z.lazy(() => SortOrderSchema).optional(),
  });

export const ConversaOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ConversaOrderByRelationAggregateInput> =
  z.strictObject({
    _count: z.lazy(() => SortOrderSchema).optional(),
  });

export const MensagemOrderByRelationAggregateInputSchema: z.ZodType<Prisma.MensagemOrderByRelationAggregateInput> =
  z.strictObject({
    _count: z.lazy(() => SortOrderSchema).optional(),
  });

export const UsuarioCountOrderByAggregateInputSchema: z.ZodType<Prisma.UsuarioCountOrderByAggregateInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    email: z.lazy(() => SortOrderSchema).optional(),
    senha: z.lazy(() => SortOrderSchema).optional(),
    tipo: z.lazy(() => SortOrderSchema).optional(),
    telefone: z.lazy(() => SortOrderSchema).optional(),
    status: z.lazy(() => SortOrderSchema).optional(),
    criadoEm: z.lazy(() => SortOrderSchema).optional(),
  });

export const UsuarioMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UsuarioMaxOrderByAggregateInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    email: z.lazy(() => SortOrderSchema).optional(),
    senha: z.lazy(() => SortOrderSchema).optional(),
    tipo: z.lazy(() => SortOrderSchema).optional(),
    telefone: z.lazy(() => SortOrderSchema).optional(),
    status: z.lazy(() => SortOrderSchema).optional(),
    criadoEm: z.lazy(() => SortOrderSchema).optional(),
  });

export const UsuarioMinOrderByAggregateInputSchema: z.ZodType<Prisma.UsuarioMinOrderByAggregateInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    email: z.lazy(() => SortOrderSchema).optional(),
    senha: z.lazy(() => SortOrderSchema).optional(),
    tipo: z.lazy(() => SortOrderSchema).optional(),
    telefone: z.lazy(() => SortOrderSchema).optional(),
    status: z.lazy(() => SortOrderSchema).optional(),
    criadoEm: z.lazy(() => SortOrderSchema).optional(),
  });

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> =
  z.strictObject({
    equals: z.string().optional(),
    in: z.string().array().optional(),
    notIn: z.string().array().optional(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    mode: z.lazy(() => QueryModeSchema).optional(),
    not: z
      .union([z.string(), z.lazy(() => NestedStringWithAggregatesFilterSchema)])
      .optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _min: z.lazy(() => NestedStringFilterSchema).optional(),
    _max: z.lazy(() => NestedStringFilterSchema).optional(),
  });

export const EnumTipoUsuarioWithAggregatesFilterSchema: z.ZodType<Prisma.EnumTipoUsuarioWithAggregatesFilter> =
  z.strictObject({
    equals: z.lazy(() => TipoUsuarioSchema).optional(),
    in: z
      .lazy(() => TipoUsuarioSchema)
      .array()
      .optional(),
    notIn: z
      .lazy(() => TipoUsuarioSchema)
      .array()
      .optional(),
    not: z
      .union([
        z.lazy(() => TipoUsuarioSchema),
        z.lazy(() => NestedEnumTipoUsuarioWithAggregatesFilterSchema),
      ])
      .optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _min: z.lazy(() => NestedEnumTipoUsuarioFilterSchema).optional(),
    _max: z.lazy(() => NestedEnumTipoUsuarioFilterSchema).optional(),
  });

export const EnumStatusUsuarioWithAggregatesFilterSchema: z.ZodType<Prisma.EnumStatusUsuarioWithAggregatesFilter> =
  z.strictObject({
    equals: z.lazy(() => StatusUsuarioSchema).optional(),
    in: z
      .lazy(() => StatusUsuarioSchema)
      .array()
      .optional(),
    notIn: z
      .lazy(() => StatusUsuarioSchema)
      .array()
      .optional(),
    not: z
      .union([
        z.lazy(() => StatusUsuarioSchema),
        z.lazy(() => NestedEnumStatusUsuarioWithAggregatesFilterSchema),
      ])
      .optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _min: z.lazy(() => NestedEnumStatusUsuarioFilterSchema).optional(),
    _max: z.lazy(() => NestedEnumStatusUsuarioFilterSchema).optional(),
  });

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> =
  z.strictObject({
    equals: z.coerce.date().optional(),
    in: z.coerce.date().array().optional(),
    notIn: z.coerce.date().array().optional(),
    lt: z.coerce.date().optional(),
    lte: z.coerce.date().optional(),
    gt: z.coerce.date().optional(),
    gte: z.coerce.date().optional(),
    not: z
      .union([
        z.coerce.date(),
        z.lazy(() => NestedDateTimeWithAggregatesFilterSchema),
      ])
      .optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
    _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  });

export const FloatFilterSchema: z.ZodType<Prisma.FloatFilter> = z.strictObject({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedFloatFilterSchema)]).optional(),
});

export const UsuarioScalarRelationFilterSchema: z.ZodType<Prisma.UsuarioScalarRelationFilter> =
  z.strictObject({
    is: z.lazy(() => UsuarioWhereInputSchema).optional(),
    isNot: z.lazy(() => UsuarioWhereInputSchema).optional(),
  });

export const VeiculoAtendimentoListRelationFilterSchema: z.ZodType<Prisma.VeiculoAtendimentoListRelationFilter> =
  z.strictObject({
    every: z.lazy(() => VeiculoAtendimentoWhereInputSchema).optional(),
    some: z.lazy(() => VeiculoAtendimentoWhereInputSchema).optional(),
    none: z.lazy(() => VeiculoAtendimentoWhereInputSchema).optional(),
  });

export const VeiculoAtendimentoOrderByRelationAggregateInputSchema: z.ZodType<Prisma.VeiculoAtendimentoOrderByRelationAggregateInput> =
  z.strictObject({
    _count: z.lazy(() => SortOrderSchema).optional(),
  });

export const VeiculoCountOrderByAggregateInputSchema: z.ZodType<Prisma.VeiculoCountOrderByAggregateInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    placa: z.lazy(() => SortOrderSchema).optional(),
    latitude: z.lazy(() => SortOrderSchema).optional(),
    longitude: z.lazy(() => SortOrderSchema).optional(),
    motoristaId: z.lazy(() => SortOrderSchema).optional(),
  });

export const VeiculoAvgOrderByAggregateInputSchema: z.ZodType<Prisma.VeiculoAvgOrderByAggregateInput> =
  z.strictObject({
    latitude: z.lazy(() => SortOrderSchema).optional(),
    longitude: z.lazy(() => SortOrderSchema).optional(),
  });

export const VeiculoMaxOrderByAggregateInputSchema: z.ZodType<Prisma.VeiculoMaxOrderByAggregateInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    placa: z.lazy(() => SortOrderSchema).optional(),
    latitude: z.lazy(() => SortOrderSchema).optional(),
    longitude: z.lazy(() => SortOrderSchema).optional(),
    motoristaId: z.lazy(() => SortOrderSchema).optional(),
  });

export const VeiculoMinOrderByAggregateInputSchema: z.ZodType<Prisma.VeiculoMinOrderByAggregateInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    placa: z.lazy(() => SortOrderSchema).optional(),
    latitude: z.lazy(() => SortOrderSchema).optional(),
    longitude: z.lazy(() => SortOrderSchema).optional(),
    motoristaId: z.lazy(() => SortOrderSchema).optional(),
  });

export const VeiculoSumOrderByAggregateInputSchema: z.ZodType<Prisma.VeiculoSumOrderByAggregateInput> =
  z.strictObject({
    latitude: z.lazy(() => SortOrderSchema).optional(),
    longitude: z.lazy(() => SortOrderSchema).optional(),
  });

export const FloatWithAggregatesFilterSchema: z.ZodType<Prisma.FloatWithAggregatesFilter> =
  z.strictObject({
    equals: z.number().optional(),
    in: z.number().array().optional(),
    notIn: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z
      .union([z.number(), z.lazy(() => NestedFloatWithAggregatesFilterSchema)])
      .optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
    _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
    _min: z.lazy(() => NestedFloatFilterSchema).optional(),
    _max: z.lazy(() => NestedFloatFilterSchema).optional(),
  });

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> =
  z.strictObject({
    equals: z.number().optional().nullable(),
    in: z.number().array().optional().nullable(),
    notIn: z.number().array().optional().nullable(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z
      .union([z.number(), z.lazy(() => NestedIntNullableFilterSchema)])
      .optional()
      .nullable(),
  });

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.strictObject({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedIntFilterSchema)]).optional(),
});

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> =
  z.strictObject({
    equals: z.string().optional().nullable(),
    in: z.string().array().optional().nullable(),
    notIn: z.string().array().optional().nullable(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    mode: z.lazy(() => QueryModeSchema).optional(),
    not: z
      .union([z.string(), z.lazy(() => NestedStringNullableFilterSchema)])
      .optional()
      .nullable(),
  });

export const NotificacaoListRelationFilterSchema: z.ZodType<Prisma.NotificacaoListRelationFilter> =
  z.strictObject({
    every: z.lazy(() => NotificacaoWhereInputSchema).optional(),
    some: z.lazy(() => NotificacaoWhereInputSchema).optional(),
    none: z.lazy(() => NotificacaoWhereInputSchema).optional(),
  });

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> =
  z.strictObject({
    sort: z.lazy(() => SortOrderSchema),
    nulls: z.lazy(() => NullsOrderSchema).optional(),
  });

export const NotificacaoOrderByRelationAggregateInputSchema: z.ZodType<Prisma.NotificacaoOrderByRelationAggregateInput> =
  z.strictObject({
    _count: z.lazy(() => SortOrderSchema).optional(),
  });

export const AtendimentoCountOrderByAggregateInputSchema: z.ZodType<Prisma.AtendimentoCountOrderByAggregateInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    protocolo: z.lazy(() => SortOrderSchema).optional(),
    endereco: z.lazy(() => SortOrderSchema).optional(),
    localDeRetorno: z.lazy(() => SortOrderSchema).optional(),
    oQueAconteceu: z.lazy(() => SortOrderSchema).optional(),
    estadoDoPaciente: z.lazy(() => SortOrderSchema).optional(),
    idadeAparente: z.lazy(() => SortOrderSchema).optional(),
    quantidadeDePacientes: z.lazy(() => SortOrderSchema).optional(),
    estadoDaLesao: z.lazy(() => SortOrderSchema).optional(),
    observacoes: z.lazy(() => SortOrderSchema).optional(),
    atendenteId: z.lazy(() => SortOrderSchema).optional(),
    criadoEm: z.lazy(() => SortOrderSchema).optional(),
  });

export const AtendimentoAvgOrderByAggregateInputSchema: z.ZodType<Prisma.AtendimentoAvgOrderByAggregateInput> =
  z.strictObject({
    idadeAparente: z.lazy(() => SortOrderSchema).optional(),
    quantidadeDePacientes: z.lazy(() => SortOrderSchema).optional(),
  });

export const AtendimentoMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AtendimentoMaxOrderByAggregateInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    protocolo: z.lazy(() => SortOrderSchema).optional(),
    endereco: z.lazy(() => SortOrderSchema).optional(),
    localDeRetorno: z.lazy(() => SortOrderSchema).optional(),
    oQueAconteceu: z.lazy(() => SortOrderSchema).optional(),
    estadoDoPaciente: z.lazy(() => SortOrderSchema).optional(),
    idadeAparente: z.lazy(() => SortOrderSchema).optional(),
    quantidadeDePacientes: z.lazy(() => SortOrderSchema).optional(),
    estadoDaLesao: z.lazy(() => SortOrderSchema).optional(),
    observacoes: z.lazy(() => SortOrderSchema).optional(),
    atendenteId: z.lazy(() => SortOrderSchema).optional(),
    criadoEm: z.lazy(() => SortOrderSchema).optional(),
  });

export const AtendimentoMinOrderByAggregateInputSchema: z.ZodType<Prisma.AtendimentoMinOrderByAggregateInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    protocolo: z.lazy(() => SortOrderSchema).optional(),
    endereco: z.lazy(() => SortOrderSchema).optional(),
    localDeRetorno: z.lazy(() => SortOrderSchema).optional(),
    oQueAconteceu: z.lazy(() => SortOrderSchema).optional(),
    estadoDoPaciente: z.lazy(() => SortOrderSchema).optional(),
    idadeAparente: z.lazy(() => SortOrderSchema).optional(),
    quantidadeDePacientes: z.lazy(() => SortOrderSchema).optional(),
    estadoDaLesao: z.lazy(() => SortOrderSchema).optional(),
    observacoes: z.lazy(() => SortOrderSchema).optional(),
    atendenteId: z.lazy(() => SortOrderSchema).optional(),
    criadoEm: z.lazy(() => SortOrderSchema).optional(),
  });

export const AtendimentoSumOrderByAggregateInputSchema: z.ZodType<Prisma.AtendimentoSumOrderByAggregateInput> =
  z.strictObject({
    idadeAparente: z.lazy(() => SortOrderSchema).optional(),
    quantidadeDePacientes: z.lazy(() => SortOrderSchema).optional(),
  });

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> =
  z.strictObject({
    equals: z.number().optional().nullable(),
    in: z.number().array().optional().nullable(),
    notIn: z.number().array().optional().nullable(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z
      .union([
        z.number(),
        z.lazy(() => NestedIntNullableWithAggregatesFilterSchema),
      ])
      .optional()
      .nullable(),
    _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
    _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
    _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
    _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
    _max: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  });

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> =
  z.strictObject({
    equals: z.number().optional(),
    in: z.number().array().optional(),
    notIn: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z
      .union([z.number(), z.lazy(() => NestedIntWithAggregatesFilterSchema)])
      .optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
    _sum: z.lazy(() => NestedIntFilterSchema).optional(),
    _min: z.lazy(() => NestedIntFilterSchema).optional(),
    _max: z.lazy(() => NestedIntFilterSchema).optional(),
  });

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> =
  z.strictObject({
    equals: z.string().optional().nullable(),
    in: z.string().array().optional().nullable(),
    notIn: z.string().array().optional().nullable(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    mode: z.lazy(() => QueryModeSchema).optional(),
    not: z
      .union([
        z.string(),
        z.lazy(() => NestedStringNullableWithAggregatesFilterSchema),
      ])
      .optional()
      .nullable(),
    _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
    _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
    _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  });

export const EnumStatusAtendimentoFilterSchema: z.ZodType<Prisma.EnumStatusAtendimentoFilter> =
  z.strictObject({
    equals: z.lazy(() => StatusAtendimentoSchema).optional(),
    in: z
      .lazy(() => StatusAtendimentoSchema)
      .array()
      .optional(),
    notIn: z
      .lazy(() => StatusAtendimentoSchema)
      .array()
      .optional(),
    not: z
      .union([
        z.lazy(() => StatusAtendimentoSchema),
        z.lazy(() => NestedEnumStatusAtendimentoFilterSchema),
      ])
      .optional(),
  });

export const VeiculoScalarRelationFilterSchema: z.ZodType<Prisma.VeiculoScalarRelationFilter> =
  z.strictObject({
    is: z.lazy(() => VeiculoWhereInputSchema).optional(),
    isNot: z.lazy(() => VeiculoWhereInputSchema).optional(),
  });

export const AtendimentoScalarRelationFilterSchema: z.ZodType<Prisma.AtendimentoScalarRelationFilter> =
  z.strictObject({
    is: z.lazy(() => AtendimentoWhereInputSchema).optional(),
    isNot: z.lazy(() => AtendimentoWhereInputSchema).optional(),
  });

export const VeiculoAtendimentoCountOrderByAggregateInputSchema: z.ZodType<Prisma.VeiculoAtendimentoCountOrderByAggregateInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    status: z.lazy(() => SortOrderSchema).optional(),
    veiculoId: z.lazy(() => SortOrderSchema).optional(),
    atendimentoId: z.lazy(() => SortOrderSchema).optional(),
  });

export const VeiculoAtendimentoMaxOrderByAggregateInputSchema: z.ZodType<Prisma.VeiculoAtendimentoMaxOrderByAggregateInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    status: z.lazy(() => SortOrderSchema).optional(),
    veiculoId: z.lazy(() => SortOrderSchema).optional(),
    atendimentoId: z.lazy(() => SortOrderSchema).optional(),
  });

export const VeiculoAtendimentoMinOrderByAggregateInputSchema: z.ZodType<Prisma.VeiculoAtendimentoMinOrderByAggregateInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    status: z.lazy(() => SortOrderSchema).optional(),
    veiculoId: z.lazy(() => SortOrderSchema).optional(),
    atendimentoId: z.lazy(() => SortOrderSchema).optional(),
  });

export const EnumStatusAtendimentoWithAggregatesFilterSchema: z.ZodType<Prisma.EnumStatusAtendimentoWithAggregatesFilter> =
  z.strictObject({
    equals: z.lazy(() => StatusAtendimentoSchema).optional(),
    in: z
      .lazy(() => StatusAtendimentoSchema)
      .array()
      .optional(),
    notIn: z
      .lazy(() => StatusAtendimentoSchema)
      .array()
      .optional(),
    not: z
      .union([
        z.lazy(() => StatusAtendimentoSchema),
        z.lazy(() => NestedEnumStatusAtendimentoWithAggregatesFilterSchema),
      ])
      .optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _min: z.lazy(() => NestedEnumStatusAtendimentoFilterSchema).optional(),
    _max: z.lazy(() => NestedEnumStatusAtendimentoFilterSchema).optional(),
  });

export const ConversaCountOrderByAggregateInputSchema: z.ZodType<Prisma.ConversaCountOrderByAggregateInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    atendenteId: z.lazy(() => SortOrderSchema).optional(),
    motoristaId: z.lazy(() => SortOrderSchema).optional(),
  });

export const ConversaMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ConversaMaxOrderByAggregateInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    atendenteId: z.lazy(() => SortOrderSchema).optional(),
    motoristaId: z.lazy(() => SortOrderSchema).optional(),
  });

export const ConversaMinOrderByAggregateInputSchema: z.ZodType<Prisma.ConversaMinOrderByAggregateInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    atendenteId: z.lazy(() => SortOrderSchema).optional(),
    motoristaId: z.lazy(() => SortOrderSchema).optional(),
  });

export const ConversaScalarRelationFilterSchema: z.ZodType<Prisma.ConversaScalarRelationFilter> =
  z.strictObject({
    is: z.lazy(() => ConversaWhereInputSchema).optional(),
    isNot: z.lazy(() => ConversaWhereInputSchema).optional(),
  });

export const MensagemCountOrderByAggregateInputSchema: z.ZodType<Prisma.MensagemCountOrderByAggregateInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    texto: z.lazy(() => SortOrderSchema).optional(),
    dataDeEnvio: z.lazy(() => SortOrderSchema).optional(),
    quemMandouId: z.lazy(() => SortOrderSchema).optional(),
    conversaId: z.lazy(() => SortOrderSchema).optional(),
  });

export const MensagemMaxOrderByAggregateInputSchema: z.ZodType<Prisma.MensagemMaxOrderByAggregateInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    texto: z.lazy(() => SortOrderSchema).optional(),
    dataDeEnvio: z.lazy(() => SortOrderSchema).optional(),
    quemMandouId: z.lazy(() => SortOrderSchema).optional(),
    conversaId: z.lazy(() => SortOrderSchema).optional(),
  });

export const MensagemMinOrderByAggregateInputSchema: z.ZodType<Prisma.MensagemMinOrderByAggregateInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    texto: z.lazy(() => SortOrderSchema).optional(),
    dataDeEnvio: z.lazy(() => SortOrderSchema).optional(),
    quemMandouId: z.lazy(() => SortOrderSchema).optional(),
    conversaId: z.lazy(() => SortOrderSchema).optional(),
  });

export const NotificacaoCountOrderByAggregateInputSchema: z.ZodType<Prisma.NotificacaoCountOrderByAggregateInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    mensagem: z.lazy(() => SortOrderSchema).optional(),
    dataDaNotificacao: z.lazy(() => SortOrderSchema).optional(),
    atendimentoId: z.lazy(() => SortOrderSchema).optional(),
  });

export const NotificacaoMaxOrderByAggregateInputSchema: z.ZodType<Prisma.NotificacaoMaxOrderByAggregateInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    mensagem: z.lazy(() => SortOrderSchema).optional(),
    dataDaNotificacao: z.lazy(() => SortOrderSchema).optional(),
    atendimentoId: z.lazy(() => SortOrderSchema).optional(),
  });

export const NotificacaoMinOrderByAggregateInputSchema: z.ZodType<Prisma.NotificacaoMinOrderByAggregateInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    mensagem: z.lazy(() => SortOrderSchema).optional(),
    dataDaNotificacao: z.lazy(() => SortOrderSchema).optional(),
    atendimentoId: z.lazy(() => SortOrderSchema).optional(),
  });

export const VeiculoCreateNestedOneWithoutMotoristaInputSchema: z.ZodType<Prisma.VeiculoCreateNestedOneWithoutMotoristaInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => VeiculoCreateWithoutMotoristaInputSchema),
        z.lazy(() => VeiculoUncheckedCreateWithoutMotoristaInputSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => VeiculoCreateOrConnectWithoutMotoristaInputSchema)
      .optional(),
    connect: z.lazy(() => VeiculoWhereUniqueInputSchema).optional(),
  });

export const AtendimentoCreateNestedManyWithoutAtendenteInputSchema: z.ZodType<Prisma.AtendimentoCreateNestedManyWithoutAtendenteInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => AtendimentoCreateWithoutAtendenteInputSchema),
        z.lazy(() => AtendimentoCreateWithoutAtendenteInputSchema).array(),
        z.lazy(() => AtendimentoUncheckedCreateWithoutAtendenteInputSchema),
        z
          .lazy(() => AtendimentoUncheckedCreateWithoutAtendenteInputSchema)
          .array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => AtendimentoCreateOrConnectWithoutAtendenteInputSchema),
        z
          .lazy(() => AtendimentoCreateOrConnectWithoutAtendenteInputSchema)
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => AtendimentoCreateManyAtendenteInputEnvelopeSchema)
      .optional(),
    connect: z
      .union([
        z.lazy(() => AtendimentoWhereUniqueInputSchema),
        z.lazy(() => AtendimentoWhereUniqueInputSchema).array(),
      ])
      .optional(),
  });

export const ConversaCreateNestedManyWithoutAtendenteInputSchema: z.ZodType<Prisma.ConversaCreateNestedManyWithoutAtendenteInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => ConversaCreateWithoutAtendenteInputSchema),
        z.lazy(() => ConversaCreateWithoutAtendenteInputSchema).array(),
        z.lazy(() => ConversaUncheckedCreateWithoutAtendenteInputSchema),
        z
          .lazy(() => ConversaUncheckedCreateWithoutAtendenteInputSchema)
          .array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => ConversaCreateOrConnectWithoutAtendenteInputSchema),
        z
          .lazy(() => ConversaCreateOrConnectWithoutAtendenteInputSchema)
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => ConversaCreateManyAtendenteInputEnvelopeSchema)
      .optional(),
    connect: z
      .union([
        z.lazy(() => ConversaWhereUniqueInputSchema),
        z.lazy(() => ConversaWhereUniqueInputSchema).array(),
      ])
      .optional(),
  });

export const ConversaCreateNestedManyWithoutMotoristaInputSchema: z.ZodType<Prisma.ConversaCreateNestedManyWithoutMotoristaInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => ConversaCreateWithoutMotoristaInputSchema),
        z.lazy(() => ConversaCreateWithoutMotoristaInputSchema).array(),
        z.lazy(() => ConversaUncheckedCreateWithoutMotoristaInputSchema),
        z
          .lazy(() => ConversaUncheckedCreateWithoutMotoristaInputSchema)
          .array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => ConversaCreateOrConnectWithoutMotoristaInputSchema),
        z
          .lazy(() => ConversaCreateOrConnectWithoutMotoristaInputSchema)
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => ConversaCreateManyMotoristaInputEnvelopeSchema)
      .optional(),
    connect: z
      .union([
        z.lazy(() => ConversaWhereUniqueInputSchema),
        z.lazy(() => ConversaWhereUniqueInputSchema).array(),
      ])
      .optional(),
  });

export const MensagemCreateNestedManyWithoutQuemMandouInputSchema: z.ZodType<Prisma.MensagemCreateNestedManyWithoutQuemMandouInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => MensagemCreateWithoutQuemMandouInputSchema),
        z.lazy(() => MensagemCreateWithoutQuemMandouInputSchema).array(),
        z.lazy(() => MensagemUncheckedCreateWithoutQuemMandouInputSchema),
        z
          .lazy(() => MensagemUncheckedCreateWithoutQuemMandouInputSchema)
          .array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => MensagemCreateOrConnectWithoutQuemMandouInputSchema),
        z
          .lazy(() => MensagemCreateOrConnectWithoutQuemMandouInputSchema)
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => MensagemCreateManyQuemMandouInputEnvelopeSchema)
      .optional(),
    connect: z
      .union([
        z.lazy(() => MensagemWhereUniqueInputSchema),
        z.lazy(() => MensagemWhereUniqueInputSchema).array(),
      ])
      .optional(),
  });

export const VeiculoUncheckedCreateNestedOneWithoutMotoristaInputSchema: z.ZodType<Prisma.VeiculoUncheckedCreateNestedOneWithoutMotoristaInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => VeiculoCreateWithoutMotoristaInputSchema),
        z.lazy(() => VeiculoUncheckedCreateWithoutMotoristaInputSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => VeiculoCreateOrConnectWithoutMotoristaInputSchema)
      .optional(),
    connect: z.lazy(() => VeiculoWhereUniqueInputSchema).optional(),
  });

export const AtendimentoUncheckedCreateNestedManyWithoutAtendenteInputSchema: z.ZodType<Prisma.AtendimentoUncheckedCreateNestedManyWithoutAtendenteInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => AtendimentoCreateWithoutAtendenteInputSchema),
        z.lazy(() => AtendimentoCreateWithoutAtendenteInputSchema).array(),
        z.lazy(() => AtendimentoUncheckedCreateWithoutAtendenteInputSchema),
        z
          .lazy(() => AtendimentoUncheckedCreateWithoutAtendenteInputSchema)
          .array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => AtendimentoCreateOrConnectWithoutAtendenteInputSchema),
        z
          .lazy(() => AtendimentoCreateOrConnectWithoutAtendenteInputSchema)
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => AtendimentoCreateManyAtendenteInputEnvelopeSchema)
      .optional(),
    connect: z
      .union([
        z.lazy(() => AtendimentoWhereUniqueInputSchema),
        z.lazy(() => AtendimentoWhereUniqueInputSchema).array(),
      ])
      .optional(),
  });

export const ConversaUncheckedCreateNestedManyWithoutAtendenteInputSchema: z.ZodType<Prisma.ConversaUncheckedCreateNestedManyWithoutAtendenteInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => ConversaCreateWithoutAtendenteInputSchema),
        z.lazy(() => ConversaCreateWithoutAtendenteInputSchema).array(),
        z.lazy(() => ConversaUncheckedCreateWithoutAtendenteInputSchema),
        z
          .lazy(() => ConversaUncheckedCreateWithoutAtendenteInputSchema)
          .array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => ConversaCreateOrConnectWithoutAtendenteInputSchema),
        z
          .lazy(() => ConversaCreateOrConnectWithoutAtendenteInputSchema)
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => ConversaCreateManyAtendenteInputEnvelopeSchema)
      .optional(),
    connect: z
      .union([
        z.lazy(() => ConversaWhereUniqueInputSchema),
        z.lazy(() => ConversaWhereUniqueInputSchema).array(),
      ])
      .optional(),
  });

export const ConversaUncheckedCreateNestedManyWithoutMotoristaInputSchema: z.ZodType<Prisma.ConversaUncheckedCreateNestedManyWithoutMotoristaInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => ConversaCreateWithoutMotoristaInputSchema),
        z.lazy(() => ConversaCreateWithoutMotoristaInputSchema).array(),
        z.lazy(() => ConversaUncheckedCreateWithoutMotoristaInputSchema),
        z
          .lazy(() => ConversaUncheckedCreateWithoutMotoristaInputSchema)
          .array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => ConversaCreateOrConnectWithoutMotoristaInputSchema),
        z
          .lazy(() => ConversaCreateOrConnectWithoutMotoristaInputSchema)
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => ConversaCreateManyMotoristaInputEnvelopeSchema)
      .optional(),
    connect: z
      .union([
        z.lazy(() => ConversaWhereUniqueInputSchema),
        z.lazy(() => ConversaWhereUniqueInputSchema).array(),
      ])
      .optional(),
  });

export const MensagemUncheckedCreateNestedManyWithoutQuemMandouInputSchema: z.ZodType<Prisma.MensagemUncheckedCreateNestedManyWithoutQuemMandouInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => MensagemCreateWithoutQuemMandouInputSchema),
        z.lazy(() => MensagemCreateWithoutQuemMandouInputSchema).array(),
        z.lazy(() => MensagemUncheckedCreateWithoutQuemMandouInputSchema),
        z
          .lazy(() => MensagemUncheckedCreateWithoutQuemMandouInputSchema)
          .array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => MensagemCreateOrConnectWithoutQuemMandouInputSchema),
        z
          .lazy(() => MensagemCreateOrConnectWithoutQuemMandouInputSchema)
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => MensagemCreateManyQuemMandouInputEnvelopeSchema)
      .optional(),
    connect: z
      .union([
        z.lazy(() => MensagemWhereUniqueInputSchema),
        z.lazy(() => MensagemWhereUniqueInputSchema).array(),
      ])
      .optional(),
  });

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> =
  z.strictObject({
    set: z.string().optional(),
  });

export const EnumTipoUsuarioFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumTipoUsuarioFieldUpdateOperationsInput> =
  z.strictObject({
    set: z.lazy(() => TipoUsuarioSchema).optional(),
  });

export const EnumStatusUsuarioFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumStatusUsuarioFieldUpdateOperationsInput> =
  z.strictObject({
    set: z.lazy(() => StatusUsuarioSchema).optional(),
  });

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> =
  z.strictObject({
    set: z.coerce.date().optional(),
  });

export const VeiculoUpdateOneWithoutMotoristaNestedInputSchema: z.ZodType<Prisma.VeiculoUpdateOneWithoutMotoristaNestedInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => VeiculoCreateWithoutMotoristaInputSchema),
        z.lazy(() => VeiculoUncheckedCreateWithoutMotoristaInputSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => VeiculoCreateOrConnectWithoutMotoristaInputSchema)
      .optional(),
    upsert: z.lazy(() => VeiculoUpsertWithoutMotoristaInputSchema).optional(),
    disconnect: z
      .union([z.boolean(), z.lazy(() => VeiculoWhereInputSchema)])
      .optional(),
    delete: z
      .union([z.boolean(), z.lazy(() => VeiculoWhereInputSchema)])
      .optional(),
    connect: z.lazy(() => VeiculoWhereUniqueInputSchema).optional(),
    update: z
      .union([
        z.lazy(() => VeiculoUpdateToOneWithWhereWithoutMotoristaInputSchema),
        z.lazy(() => VeiculoUpdateWithoutMotoristaInputSchema),
        z.lazy(() => VeiculoUncheckedUpdateWithoutMotoristaInputSchema),
      ])
      .optional(),
  });

export const AtendimentoUpdateManyWithoutAtendenteNestedInputSchema: z.ZodType<Prisma.AtendimentoUpdateManyWithoutAtendenteNestedInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => AtendimentoCreateWithoutAtendenteInputSchema),
        z.lazy(() => AtendimentoCreateWithoutAtendenteInputSchema).array(),
        z.lazy(() => AtendimentoUncheckedCreateWithoutAtendenteInputSchema),
        z
          .lazy(() => AtendimentoUncheckedCreateWithoutAtendenteInputSchema)
          .array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => AtendimentoCreateOrConnectWithoutAtendenteInputSchema),
        z
          .lazy(() => AtendimentoCreateOrConnectWithoutAtendenteInputSchema)
          .array(),
      ])
      .optional(),
    upsert: z
      .union([
        z.lazy(
          () => AtendimentoUpsertWithWhereUniqueWithoutAtendenteInputSchema,
        ),
        z
          .lazy(
            () => AtendimentoUpsertWithWhereUniqueWithoutAtendenteInputSchema,
          )
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => AtendimentoCreateManyAtendenteInputEnvelopeSchema)
      .optional(),
    set: z
      .union([
        z.lazy(() => AtendimentoWhereUniqueInputSchema),
        z.lazy(() => AtendimentoWhereUniqueInputSchema).array(),
      ])
      .optional(),
    disconnect: z
      .union([
        z.lazy(() => AtendimentoWhereUniqueInputSchema),
        z.lazy(() => AtendimentoWhereUniqueInputSchema).array(),
      ])
      .optional(),
    delete: z
      .union([
        z.lazy(() => AtendimentoWhereUniqueInputSchema),
        z.lazy(() => AtendimentoWhereUniqueInputSchema).array(),
      ])
      .optional(),
    connect: z
      .union([
        z.lazy(() => AtendimentoWhereUniqueInputSchema),
        z.lazy(() => AtendimentoWhereUniqueInputSchema).array(),
      ])
      .optional(),
    update: z
      .union([
        z.lazy(
          () => AtendimentoUpdateWithWhereUniqueWithoutAtendenteInputSchema,
        ),
        z
          .lazy(
            () => AtendimentoUpdateWithWhereUniqueWithoutAtendenteInputSchema,
          )
          .array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => AtendimentoUpdateManyWithWhereWithoutAtendenteInputSchema),
        z
          .lazy(() => AtendimentoUpdateManyWithWhereWithoutAtendenteInputSchema)
          .array(),
      ])
      .optional(),
    deleteMany: z
      .union([
        z.lazy(() => AtendimentoScalarWhereInputSchema),
        z.lazy(() => AtendimentoScalarWhereInputSchema).array(),
      ])
      .optional(),
  });

export const ConversaUpdateManyWithoutAtendenteNestedInputSchema: z.ZodType<Prisma.ConversaUpdateManyWithoutAtendenteNestedInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => ConversaCreateWithoutAtendenteInputSchema),
        z.lazy(() => ConversaCreateWithoutAtendenteInputSchema).array(),
        z.lazy(() => ConversaUncheckedCreateWithoutAtendenteInputSchema),
        z
          .lazy(() => ConversaUncheckedCreateWithoutAtendenteInputSchema)
          .array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => ConversaCreateOrConnectWithoutAtendenteInputSchema),
        z
          .lazy(() => ConversaCreateOrConnectWithoutAtendenteInputSchema)
          .array(),
      ])
      .optional(),
    upsert: z
      .union([
        z.lazy(() => ConversaUpsertWithWhereUniqueWithoutAtendenteInputSchema),
        z
          .lazy(() => ConversaUpsertWithWhereUniqueWithoutAtendenteInputSchema)
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => ConversaCreateManyAtendenteInputEnvelopeSchema)
      .optional(),
    set: z
      .union([
        z.lazy(() => ConversaWhereUniqueInputSchema),
        z.lazy(() => ConversaWhereUniqueInputSchema).array(),
      ])
      .optional(),
    disconnect: z
      .union([
        z.lazy(() => ConversaWhereUniqueInputSchema),
        z.lazy(() => ConversaWhereUniqueInputSchema).array(),
      ])
      .optional(),
    delete: z
      .union([
        z.lazy(() => ConversaWhereUniqueInputSchema),
        z.lazy(() => ConversaWhereUniqueInputSchema).array(),
      ])
      .optional(),
    connect: z
      .union([
        z.lazy(() => ConversaWhereUniqueInputSchema),
        z.lazy(() => ConversaWhereUniqueInputSchema).array(),
      ])
      .optional(),
    update: z
      .union([
        z.lazy(() => ConversaUpdateWithWhereUniqueWithoutAtendenteInputSchema),
        z
          .lazy(() => ConversaUpdateWithWhereUniqueWithoutAtendenteInputSchema)
          .array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => ConversaUpdateManyWithWhereWithoutAtendenteInputSchema),
        z
          .lazy(() => ConversaUpdateManyWithWhereWithoutAtendenteInputSchema)
          .array(),
      ])
      .optional(),
    deleteMany: z
      .union([
        z.lazy(() => ConversaScalarWhereInputSchema),
        z.lazy(() => ConversaScalarWhereInputSchema).array(),
      ])
      .optional(),
  });

export const ConversaUpdateManyWithoutMotoristaNestedInputSchema: z.ZodType<Prisma.ConversaUpdateManyWithoutMotoristaNestedInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => ConversaCreateWithoutMotoristaInputSchema),
        z.lazy(() => ConversaCreateWithoutMotoristaInputSchema).array(),
        z.lazy(() => ConversaUncheckedCreateWithoutMotoristaInputSchema),
        z
          .lazy(() => ConversaUncheckedCreateWithoutMotoristaInputSchema)
          .array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => ConversaCreateOrConnectWithoutMotoristaInputSchema),
        z
          .lazy(() => ConversaCreateOrConnectWithoutMotoristaInputSchema)
          .array(),
      ])
      .optional(),
    upsert: z
      .union([
        z.lazy(() => ConversaUpsertWithWhereUniqueWithoutMotoristaInputSchema),
        z
          .lazy(() => ConversaUpsertWithWhereUniqueWithoutMotoristaInputSchema)
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => ConversaCreateManyMotoristaInputEnvelopeSchema)
      .optional(),
    set: z
      .union([
        z.lazy(() => ConversaWhereUniqueInputSchema),
        z.lazy(() => ConversaWhereUniqueInputSchema).array(),
      ])
      .optional(),
    disconnect: z
      .union([
        z.lazy(() => ConversaWhereUniqueInputSchema),
        z.lazy(() => ConversaWhereUniqueInputSchema).array(),
      ])
      .optional(),
    delete: z
      .union([
        z.lazy(() => ConversaWhereUniqueInputSchema),
        z.lazy(() => ConversaWhereUniqueInputSchema).array(),
      ])
      .optional(),
    connect: z
      .union([
        z.lazy(() => ConversaWhereUniqueInputSchema),
        z.lazy(() => ConversaWhereUniqueInputSchema).array(),
      ])
      .optional(),
    update: z
      .union([
        z.lazy(() => ConversaUpdateWithWhereUniqueWithoutMotoristaInputSchema),
        z
          .lazy(() => ConversaUpdateWithWhereUniqueWithoutMotoristaInputSchema)
          .array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => ConversaUpdateManyWithWhereWithoutMotoristaInputSchema),
        z
          .lazy(() => ConversaUpdateManyWithWhereWithoutMotoristaInputSchema)
          .array(),
      ])
      .optional(),
    deleteMany: z
      .union([
        z.lazy(() => ConversaScalarWhereInputSchema),
        z.lazy(() => ConversaScalarWhereInputSchema).array(),
      ])
      .optional(),
  });

export const MensagemUpdateManyWithoutQuemMandouNestedInputSchema: z.ZodType<Prisma.MensagemUpdateManyWithoutQuemMandouNestedInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => MensagemCreateWithoutQuemMandouInputSchema),
        z.lazy(() => MensagemCreateWithoutQuemMandouInputSchema).array(),
        z.lazy(() => MensagemUncheckedCreateWithoutQuemMandouInputSchema),
        z
          .lazy(() => MensagemUncheckedCreateWithoutQuemMandouInputSchema)
          .array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => MensagemCreateOrConnectWithoutQuemMandouInputSchema),
        z
          .lazy(() => MensagemCreateOrConnectWithoutQuemMandouInputSchema)
          .array(),
      ])
      .optional(),
    upsert: z
      .union([
        z.lazy(() => MensagemUpsertWithWhereUniqueWithoutQuemMandouInputSchema),
        z
          .lazy(() => MensagemUpsertWithWhereUniqueWithoutQuemMandouInputSchema)
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => MensagemCreateManyQuemMandouInputEnvelopeSchema)
      .optional(),
    set: z
      .union([
        z.lazy(() => MensagemWhereUniqueInputSchema),
        z.lazy(() => MensagemWhereUniqueInputSchema).array(),
      ])
      .optional(),
    disconnect: z
      .union([
        z.lazy(() => MensagemWhereUniqueInputSchema),
        z.lazy(() => MensagemWhereUniqueInputSchema).array(),
      ])
      .optional(),
    delete: z
      .union([
        z.lazy(() => MensagemWhereUniqueInputSchema),
        z.lazy(() => MensagemWhereUniqueInputSchema).array(),
      ])
      .optional(),
    connect: z
      .union([
        z.lazy(() => MensagemWhereUniqueInputSchema),
        z.lazy(() => MensagemWhereUniqueInputSchema).array(),
      ])
      .optional(),
    update: z
      .union([
        z.lazy(() => MensagemUpdateWithWhereUniqueWithoutQuemMandouInputSchema),
        z
          .lazy(() => MensagemUpdateWithWhereUniqueWithoutQuemMandouInputSchema)
          .array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => MensagemUpdateManyWithWhereWithoutQuemMandouInputSchema),
        z
          .lazy(() => MensagemUpdateManyWithWhereWithoutQuemMandouInputSchema)
          .array(),
      ])
      .optional(),
    deleteMany: z
      .union([
        z.lazy(() => MensagemScalarWhereInputSchema),
        z.lazy(() => MensagemScalarWhereInputSchema).array(),
      ])
      .optional(),
  });

export const VeiculoUncheckedUpdateOneWithoutMotoristaNestedInputSchema: z.ZodType<Prisma.VeiculoUncheckedUpdateOneWithoutMotoristaNestedInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => VeiculoCreateWithoutMotoristaInputSchema),
        z.lazy(() => VeiculoUncheckedCreateWithoutMotoristaInputSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => VeiculoCreateOrConnectWithoutMotoristaInputSchema)
      .optional(),
    upsert: z.lazy(() => VeiculoUpsertWithoutMotoristaInputSchema).optional(),
    disconnect: z
      .union([z.boolean(), z.lazy(() => VeiculoWhereInputSchema)])
      .optional(),
    delete: z
      .union([z.boolean(), z.lazy(() => VeiculoWhereInputSchema)])
      .optional(),
    connect: z.lazy(() => VeiculoWhereUniqueInputSchema).optional(),
    update: z
      .union([
        z.lazy(() => VeiculoUpdateToOneWithWhereWithoutMotoristaInputSchema),
        z.lazy(() => VeiculoUpdateWithoutMotoristaInputSchema),
        z.lazy(() => VeiculoUncheckedUpdateWithoutMotoristaInputSchema),
      ])
      .optional(),
  });

export const AtendimentoUncheckedUpdateManyWithoutAtendenteNestedInputSchema: z.ZodType<Prisma.AtendimentoUncheckedUpdateManyWithoutAtendenteNestedInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => AtendimentoCreateWithoutAtendenteInputSchema),
        z.lazy(() => AtendimentoCreateWithoutAtendenteInputSchema).array(),
        z.lazy(() => AtendimentoUncheckedCreateWithoutAtendenteInputSchema),
        z
          .lazy(() => AtendimentoUncheckedCreateWithoutAtendenteInputSchema)
          .array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => AtendimentoCreateOrConnectWithoutAtendenteInputSchema),
        z
          .lazy(() => AtendimentoCreateOrConnectWithoutAtendenteInputSchema)
          .array(),
      ])
      .optional(),
    upsert: z
      .union([
        z.lazy(
          () => AtendimentoUpsertWithWhereUniqueWithoutAtendenteInputSchema,
        ),
        z
          .lazy(
            () => AtendimentoUpsertWithWhereUniqueWithoutAtendenteInputSchema,
          )
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => AtendimentoCreateManyAtendenteInputEnvelopeSchema)
      .optional(),
    set: z
      .union([
        z.lazy(() => AtendimentoWhereUniqueInputSchema),
        z.lazy(() => AtendimentoWhereUniqueInputSchema).array(),
      ])
      .optional(),
    disconnect: z
      .union([
        z.lazy(() => AtendimentoWhereUniqueInputSchema),
        z.lazy(() => AtendimentoWhereUniqueInputSchema).array(),
      ])
      .optional(),
    delete: z
      .union([
        z.lazy(() => AtendimentoWhereUniqueInputSchema),
        z.lazy(() => AtendimentoWhereUniqueInputSchema).array(),
      ])
      .optional(),
    connect: z
      .union([
        z.lazy(() => AtendimentoWhereUniqueInputSchema),
        z.lazy(() => AtendimentoWhereUniqueInputSchema).array(),
      ])
      .optional(),
    update: z
      .union([
        z.lazy(
          () => AtendimentoUpdateWithWhereUniqueWithoutAtendenteInputSchema,
        ),
        z
          .lazy(
            () => AtendimentoUpdateWithWhereUniqueWithoutAtendenteInputSchema,
          )
          .array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => AtendimentoUpdateManyWithWhereWithoutAtendenteInputSchema),
        z
          .lazy(() => AtendimentoUpdateManyWithWhereWithoutAtendenteInputSchema)
          .array(),
      ])
      .optional(),
    deleteMany: z
      .union([
        z.lazy(() => AtendimentoScalarWhereInputSchema),
        z.lazy(() => AtendimentoScalarWhereInputSchema).array(),
      ])
      .optional(),
  });

export const ConversaUncheckedUpdateManyWithoutAtendenteNestedInputSchema: z.ZodType<Prisma.ConversaUncheckedUpdateManyWithoutAtendenteNestedInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => ConversaCreateWithoutAtendenteInputSchema),
        z.lazy(() => ConversaCreateWithoutAtendenteInputSchema).array(),
        z.lazy(() => ConversaUncheckedCreateWithoutAtendenteInputSchema),
        z
          .lazy(() => ConversaUncheckedCreateWithoutAtendenteInputSchema)
          .array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => ConversaCreateOrConnectWithoutAtendenteInputSchema),
        z
          .lazy(() => ConversaCreateOrConnectWithoutAtendenteInputSchema)
          .array(),
      ])
      .optional(),
    upsert: z
      .union([
        z.lazy(() => ConversaUpsertWithWhereUniqueWithoutAtendenteInputSchema),
        z
          .lazy(() => ConversaUpsertWithWhereUniqueWithoutAtendenteInputSchema)
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => ConversaCreateManyAtendenteInputEnvelopeSchema)
      .optional(),
    set: z
      .union([
        z.lazy(() => ConversaWhereUniqueInputSchema),
        z.lazy(() => ConversaWhereUniqueInputSchema).array(),
      ])
      .optional(),
    disconnect: z
      .union([
        z.lazy(() => ConversaWhereUniqueInputSchema),
        z.lazy(() => ConversaWhereUniqueInputSchema).array(),
      ])
      .optional(),
    delete: z
      .union([
        z.lazy(() => ConversaWhereUniqueInputSchema),
        z.lazy(() => ConversaWhereUniqueInputSchema).array(),
      ])
      .optional(),
    connect: z
      .union([
        z.lazy(() => ConversaWhereUniqueInputSchema),
        z.lazy(() => ConversaWhereUniqueInputSchema).array(),
      ])
      .optional(),
    update: z
      .union([
        z.lazy(() => ConversaUpdateWithWhereUniqueWithoutAtendenteInputSchema),
        z
          .lazy(() => ConversaUpdateWithWhereUniqueWithoutAtendenteInputSchema)
          .array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => ConversaUpdateManyWithWhereWithoutAtendenteInputSchema),
        z
          .lazy(() => ConversaUpdateManyWithWhereWithoutAtendenteInputSchema)
          .array(),
      ])
      .optional(),
    deleteMany: z
      .union([
        z.lazy(() => ConversaScalarWhereInputSchema),
        z.lazy(() => ConversaScalarWhereInputSchema).array(),
      ])
      .optional(),
  });

export const ConversaUncheckedUpdateManyWithoutMotoristaNestedInputSchema: z.ZodType<Prisma.ConversaUncheckedUpdateManyWithoutMotoristaNestedInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => ConversaCreateWithoutMotoristaInputSchema),
        z.lazy(() => ConversaCreateWithoutMotoristaInputSchema).array(),
        z.lazy(() => ConversaUncheckedCreateWithoutMotoristaInputSchema),
        z
          .lazy(() => ConversaUncheckedCreateWithoutMotoristaInputSchema)
          .array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => ConversaCreateOrConnectWithoutMotoristaInputSchema),
        z
          .lazy(() => ConversaCreateOrConnectWithoutMotoristaInputSchema)
          .array(),
      ])
      .optional(),
    upsert: z
      .union([
        z.lazy(() => ConversaUpsertWithWhereUniqueWithoutMotoristaInputSchema),
        z
          .lazy(() => ConversaUpsertWithWhereUniqueWithoutMotoristaInputSchema)
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => ConversaCreateManyMotoristaInputEnvelopeSchema)
      .optional(),
    set: z
      .union([
        z.lazy(() => ConversaWhereUniqueInputSchema),
        z.lazy(() => ConversaWhereUniqueInputSchema).array(),
      ])
      .optional(),
    disconnect: z
      .union([
        z.lazy(() => ConversaWhereUniqueInputSchema),
        z.lazy(() => ConversaWhereUniqueInputSchema).array(),
      ])
      .optional(),
    delete: z
      .union([
        z.lazy(() => ConversaWhereUniqueInputSchema),
        z.lazy(() => ConversaWhereUniqueInputSchema).array(),
      ])
      .optional(),
    connect: z
      .union([
        z.lazy(() => ConversaWhereUniqueInputSchema),
        z.lazy(() => ConversaWhereUniqueInputSchema).array(),
      ])
      .optional(),
    update: z
      .union([
        z.lazy(() => ConversaUpdateWithWhereUniqueWithoutMotoristaInputSchema),
        z
          .lazy(() => ConversaUpdateWithWhereUniqueWithoutMotoristaInputSchema)
          .array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => ConversaUpdateManyWithWhereWithoutMotoristaInputSchema),
        z
          .lazy(() => ConversaUpdateManyWithWhereWithoutMotoristaInputSchema)
          .array(),
      ])
      .optional(),
    deleteMany: z
      .union([
        z.lazy(() => ConversaScalarWhereInputSchema),
        z.lazy(() => ConversaScalarWhereInputSchema).array(),
      ])
      .optional(),
  });

export const MensagemUncheckedUpdateManyWithoutQuemMandouNestedInputSchema: z.ZodType<Prisma.MensagemUncheckedUpdateManyWithoutQuemMandouNestedInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => MensagemCreateWithoutQuemMandouInputSchema),
        z.lazy(() => MensagemCreateWithoutQuemMandouInputSchema).array(),
        z.lazy(() => MensagemUncheckedCreateWithoutQuemMandouInputSchema),
        z
          .lazy(() => MensagemUncheckedCreateWithoutQuemMandouInputSchema)
          .array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => MensagemCreateOrConnectWithoutQuemMandouInputSchema),
        z
          .lazy(() => MensagemCreateOrConnectWithoutQuemMandouInputSchema)
          .array(),
      ])
      .optional(),
    upsert: z
      .union([
        z.lazy(() => MensagemUpsertWithWhereUniqueWithoutQuemMandouInputSchema),
        z
          .lazy(() => MensagemUpsertWithWhereUniqueWithoutQuemMandouInputSchema)
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => MensagemCreateManyQuemMandouInputEnvelopeSchema)
      .optional(),
    set: z
      .union([
        z.lazy(() => MensagemWhereUniqueInputSchema),
        z.lazy(() => MensagemWhereUniqueInputSchema).array(),
      ])
      .optional(),
    disconnect: z
      .union([
        z.lazy(() => MensagemWhereUniqueInputSchema),
        z.lazy(() => MensagemWhereUniqueInputSchema).array(),
      ])
      .optional(),
    delete: z
      .union([
        z.lazy(() => MensagemWhereUniqueInputSchema),
        z.lazy(() => MensagemWhereUniqueInputSchema).array(),
      ])
      .optional(),
    connect: z
      .union([
        z.lazy(() => MensagemWhereUniqueInputSchema),
        z.lazy(() => MensagemWhereUniqueInputSchema).array(),
      ])
      .optional(),
    update: z
      .union([
        z.lazy(() => MensagemUpdateWithWhereUniqueWithoutQuemMandouInputSchema),
        z
          .lazy(() => MensagemUpdateWithWhereUniqueWithoutQuemMandouInputSchema)
          .array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => MensagemUpdateManyWithWhereWithoutQuemMandouInputSchema),
        z
          .lazy(() => MensagemUpdateManyWithWhereWithoutQuemMandouInputSchema)
          .array(),
      ])
      .optional(),
    deleteMany: z
      .union([
        z.lazy(() => MensagemScalarWhereInputSchema),
        z.lazy(() => MensagemScalarWhereInputSchema).array(),
      ])
      .optional(),
  });

export const UsuarioCreateNestedOneWithoutVeiculoInputSchema: z.ZodType<Prisma.UsuarioCreateNestedOneWithoutVeiculoInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => UsuarioCreateWithoutVeiculoInputSchema),
        z.lazy(() => UsuarioUncheckedCreateWithoutVeiculoInputSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => UsuarioCreateOrConnectWithoutVeiculoInputSchema)
      .optional(),
    connect: z.lazy(() => UsuarioWhereUniqueInputSchema).optional(),
  });

export const VeiculoAtendimentoCreateNestedManyWithoutVeiculoInputSchema: z.ZodType<Prisma.VeiculoAtendimentoCreateNestedManyWithoutVeiculoInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => VeiculoAtendimentoCreateWithoutVeiculoInputSchema),
        z.lazy(() => VeiculoAtendimentoCreateWithoutVeiculoInputSchema).array(),
        z.lazy(
          () => VeiculoAtendimentoUncheckedCreateWithoutVeiculoInputSchema,
        ),
        z
          .lazy(
            () => VeiculoAtendimentoUncheckedCreateWithoutVeiculoInputSchema,
          )
          .array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(
          () => VeiculoAtendimentoCreateOrConnectWithoutVeiculoInputSchema,
        ),
        z
          .lazy(
            () => VeiculoAtendimentoCreateOrConnectWithoutVeiculoInputSchema,
          )
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => VeiculoAtendimentoCreateManyVeiculoInputEnvelopeSchema)
      .optional(),
    connect: z
      .union([
        z.lazy(() => VeiculoAtendimentoWhereUniqueInputSchema),
        z.lazy(() => VeiculoAtendimentoWhereUniqueInputSchema).array(),
      ])
      .optional(),
  });

export const VeiculoAtendimentoUncheckedCreateNestedManyWithoutVeiculoInputSchema: z.ZodType<Prisma.VeiculoAtendimentoUncheckedCreateNestedManyWithoutVeiculoInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => VeiculoAtendimentoCreateWithoutVeiculoInputSchema),
        z.lazy(() => VeiculoAtendimentoCreateWithoutVeiculoInputSchema).array(),
        z.lazy(
          () => VeiculoAtendimentoUncheckedCreateWithoutVeiculoInputSchema,
        ),
        z
          .lazy(
            () => VeiculoAtendimentoUncheckedCreateWithoutVeiculoInputSchema,
          )
          .array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(
          () => VeiculoAtendimentoCreateOrConnectWithoutVeiculoInputSchema,
        ),
        z
          .lazy(
            () => VeiculoAtendimentoCreateOrConnectWithoutVeiculoInputSchema,
          )
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => VeiculoAtendimentoCreateManyVeiculoInputEnvelopeSchema)
      .optional(),
    connect: z
      .union([
        z.lazy(() => VeiculoAtendimentoWhereUniqueInputSchema),
        z.lazy(() => VeiculoAtendimentoWhereUniqueInputSchema).array(),
      ])
      .optional(),
  });

export const FloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.FloatFieldUpdateOperationsInput> =
  z.strictObject({
    set: z.number().optional(),
    increment: z.number().optional(),
    decrement: z.number().optional(),
    multiply: z.number().optional(),
    divide: z.number().optional(),
  });

export const UsuarioUpdateOneRequiredWithoutVeiculoNestedInputSchema: z.ZodType<Prisma.UsuarioUpdateOneRequiredWithoutVeiculoNestedInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => UsuarioCreateWithoutVeiculoInputSchema),
        z.lazy(() => UsuarioUncheckedCreateWithoutVeiculoInputSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => UsuarioCreateOrConnectWithoutVeiculoInputSchema)
      .optional(),
    upsert: z.lazy(() => UsuarioUpsertWithoutVeiculoInputSchema).optional(),
    connect: z.lazy(() => UsuarioWhereUniqueInputSchema).optional(),
    update: z
      .union([
        z.lazy(() => UsuarioUpdateToOneWithWhereWithoutVeiculoInputSchema),
        z.lazy(() => UsuarioUpdateWithoutVeiculoInputSchema),
        z.lazy(() => UsuarioUncheckedUpdateWithoutVeiculoInputSchema),
      ])
      .optional(),
  });

export const VeiculoAtendimentoUpdateManyWithoutVeiculoNestedInputSchema: z.ZodType<Prisma.VeiculoAtendimentoUpdateManyWithoutVeiculoNestedInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => VeiculoAtendimentoCreateWithoutVeiculoInputSchema),
        z.lazy(() => VeiculoAtendimentoCreateWithoutVeiculoInputSchema).array(),
        z.lazy(
          () => VeiculoAtendimentoUncheckedCreateWithoutVeiculoInputSchema,
        ),
        z
          .lazy(
            () => VeiculoAtendimentoUncheckedCreateWithoutVeiculoInputSchema,
          )
          .array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(
          () => VeiculoAtendimentoCreateOrConnectWithoutVeiculoInputSchema,
        ),
        z
          .lazy(
            () => VeiculoAtendimentoCreateOrConnectWithoutVeiculoInputSchema,
          )
          .array(),
      ])
      .optional(),
    upsert: z
      .union([
        z.lazy(
          () =>
            VeiculoAtendimentoUpsertWithWhereUniqueWithoutVeiculoInputSchema,
        ),
        z
          .lazy(
            () =>
              VeiculoAtendimentoUpsertWithWhereUniqueWithoutVeiculoInputSchema,
          )
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => VeiculoAtendimentoCreateManyVeiculoInputEnvelopeSchema)
      .optional(),
    set: z
      .union([
        z.lazy(() => VeiculoAtendimentoWhereUniqueInputSchema),
        z.lazy(() => VeiculoAtendimentoWhereUniqueInputSchema).array(),
      ])
      .optional(),
    disconnect: z
      .union([
        z.lazy(() => VeiculoAtendimentoWhereUniqueInputSchema),
        z.lazy(() => VeiculoAtendimentoWhereUniqueInputSchema).array(),
      ])
      .optional(),
    delete: z
      .union([
        z.lazy(() => VeiculoAtendimentoWhereUniqueInputSchema),
        z.lazy(() => VeiculoAtendimentoWhereUniqueInputSchema).array(),
      ])
      .optional(),
    connect: z
      .union([
        z.lazy(() => VeiculoAtendimentoWhereUniqueInputSchema),
        z.lazy(() => VeiculoAtendimentoWhereUniqueInputSchema).array(),
      ])
      .optional(),
    update: z
      .union([
        z.lazy(
          () =>
            VeiculoAtendimentoUpdateWithWhereUniqueWithoutVeiculoInputSchema,
        ),
        z
          .lazy(
            () =>
              VeiculoAtendimentoUpdateWithWhereUniqueWithoutVeiculoInputSchema,
          )
          .array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(
          () => VeiculoAtendimentoUpdateManyWithWhereWithoutVeiculoInputSchema,
        ),
        z
          .lazy(
            () =>
              VeiculoAtendimentoUpdateManyWithWhereWithoutVeiculoInputSchema,
          )
          .array(),
      ])
      .optional(),
    deleteMany: z
      .union([
        z.lazy(() => VeiculoAtendimentoScalarWhereInputSchema),
        z.lazy(() => VeiculoAtendimentoScalarWhereInputSchema).array(),
      ])
      .optional(),
  });

export const VeiculoAtendimentoUncheckedUpdateManyWithoutVeiculoNestedInputSchema: z.ZodType<Prisma.VeiculoAtendimentoUncheckedUpdateManyWithoutVeiculoNestedInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => VeiculoAtendimentoCreateWithoutVeiculoInputSchema),
        z.lazy(() => VeiculoAtendimentoCreateWithoutVeiculoInputSchema).array(),
        z.lazy(
          () => VeiculoAtendimentoUncheckedCreateWithoutVeiculoInputSchema,
        ),
        z
          .lazy(
            () => VeiculoAtendimentoUncheckedCreateWithoutVeiculoInputSchema,
          )
          .array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(
          () => VeiculoAtendimentoCreateOrConnectWithoutVeiculoInputSchema,
        ),
        z
          .lazy(
            () => VeiculoAtendimentoCreateOrConnectWithoutVeiculoInputSchema,
          )
          .array(),
      ])
      .optional(),
    upsert: z
      .union([
        z.lazy(
          () =>
            VeiculoAtendimentoUpsertWithWhereUniqueWithoutVeiculoInputSchema,
        ),
        z
          .lazy(
            () =>
              VeiculoAtendimentoUpsertWithWhereUniqueWithoutVeiculoInputSchema,
          )
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => VeiculoAtendimentoCreateManyVeiculoInputEnvelopeSchema)
      .optional(),
    set: z
      .union([
        z.lazy(() => VeiculoAtendimentoWhereUniqueInputSchema),
        z.lazy(() => VeiculoAtendimentoWhereUniqueInputSchema).array(),
      ])
      .optional(),
    disconnect: z
      .union([
        z.lazy(() => VeiculoAtendimentoWhereUniqueInputSchema),
        z.lazy(() => VeiculoAtendimentoWhereUniqueInputSchema).array(),
      ])
      .optional(),
    delete: z
      .union([
        z.lazy(() => VeiculoAtendimentoWhereUniqueInputSchema),
        z.lazy(() => VeiculoAtendimentoWhereUniqueInputSchema).array(),
      ])
      .optional(),
    connect: z
      .union([
        z.lazy(() => VeiculoAtendimentoWhereUniqueInputSchema),
        z.lazy(() => VeiculoAtendimentoWhereUniqueInputSchema).array(),
      ])
      .optional(),
    update: z
      .union([
        z.lazy(
          () =>
            VeiculoAtendimentoUpdateWithWhereUniqueWithoutVeiculoInputSchema,
        ),
        z
          .lazy(
            () =>
              VeiculoAtendimentoUpdateWithWhereUniqueWithoutVeiculoInputSchema,
          )
          .array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(
          () => VeiculoAtendimentoUpdateManyWithWhereWithoutVeiculoInputSchema,
        ),
        z
          .lazy(
            () =>
              VeiculoAtendimentoUpdateManyWithWhereWithoutVeiculoInputSchema,
          )
          .array(),
      ])
      .optional(),
    deleteMany: z
      .union([
        z.lazy(() => VeiculoAtendimentoScalarWhereInputSchema),
        z.lazy(() => VeiculoAtendimentoScalarWhereInputSchema).array(),
      ])
      .optional(),
  });

export const UsuarioCreateNestedOneWithoutAtendimentosRegistradosInputSchema: z.ZodType<Prisma.UsuarioCreateNestedOneWithoutAtendimentosRegistradosInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => UsuarioCreateWithoutAtendimentosRegistradosInputSchema),
        z.lazy(
          () => UsuarioUncheckedCreateWithoutAtendimentosRegistradosInputSchema,
        ),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(
        () => UsuarioCreateOrConnectWithoutAtendimentosRegistradosInputSchema,
      )
      .optional(),
    connect: z.lazy(() => UsuarioWhereUniqueInputSchema).optional(),
  });

export const VeiculoAtendimentoCreateNestedManyWithoutAtendimentoInputSchema: z.ZodType<Prisma.VeiculoAtendimentoCreateNestedManyWithoutAtendimentoInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => VeiculoAtendimentoCreateWithoutAtendimentoInputSchema),
        z
          .lazy(() => VeiculoAtendimentoCreateWithoutAtendimentoInputSchema)
          .array(),
        z.lazy(
          () => VeiculoAtendimentoUncheckedCreateWithoutAtendimentoInputSchema,
        ),
        z
          .lazy(
            () =>
              VeiculoAtendimentoUncheckedCreateWithoutAtendimentoInputSchema,
          )
          .array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(
          () => VeiculoAtendimentoCreateOrConnectWithoutAtendimentoInputSchema,
        ),
        z
          .lazy(
            () =>
              VeiculoAtendimentoCreateOrConnectWithoutAtendimentoInputSchema,
          )
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => VeiculoAtendimentoCreateManyAtendimentoInputEnvelopeSchema)
      .optional(),
    connect: z
      .union([
        z.lazy(() => VeiculoAtendimentoWhereUniqueInputSchema),
        z.lazy(() => VeiculoAtendimentoWhereUniqueInputSchema).array(),
      ])
      .optional(),
  });

export const NotificacaoCreateNestedManyWithoutAtendimentoInputSchema: z.ZodType<Prisma.NotificacaoCreateNestedManyWithoutAtendimentoInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => NotificacaoCreateWithoutAtendimentoInputSchema),
        z.lazy(() => NotificacaoCreateWithoutAtendimentoInputSchema).array(),
        z.lazy(() => NotificacaoUncheckedCreateWithoutAtendimentoInputSchema),
        z
          .lazy(() => NotificacaoUncheckedCreateWithoutAtendimentoInputSchema)
          .array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => NotificacaoCreateOrConnectWithoutAtendimentoInputSchema),
        z
          .lazy(() => NotificacaoCreateOrConnectWithoutAtendimentoInputSchema)
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => NotificacaoCreateManyAtendimentoInputEnvelopeSchema)
      .optional(),
    connect: z
      .union([
        z.lazy(() => NotificacaoWhereUniqueInputSchema),
        z.lazy(() => NotificacaoWhereUniqueInputSchema).array(),
      ])
      .optional(),
  });

export const VeiculoAtendimentoUncheckedCreateNestedManyWithoutAtendimentoInputSchema: z.ZodType<Prisma.VeiculoAtendimentoUncheckedCreateNestedManyWithoutAtendimentoInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => VeiculoAtendimentoCreateWithoutAtendimentoInputSchema),
        z
          .lazy(() => VeiculoAtendimentoCreateWithoutAtendimentoInputSchema)
          .array(),
        z.lazy(
          () => VeiculoAtendimentoUncheckedCreateWithoutAtendimentoInputSchema,
        ),
        z
          .lazy(
            () =>
              VeiculoAtendimentoUncheckedCreateWithoutAtendimentoInputSchema,
          )
          .array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(
          () => VeiculoAtendimentoCreateOrConnectWithoutAtendimentoInputSchema,
        ),
        z
          .lazy(
            () =>
              VeiculoAtendimentoCreateOrConnectWithoutAtendimentoInputSchema,
          )
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => VeiculoAtendimentoCreateManyAtendimentoInputEnvelopeSchema)
      .optional(),
    connect: z
      .union([
        z.lazy(() => VeiculoAtendimentoWhereUniqueInputSchema),
        z.lazy(() => VeiculoAtendimentoWhereUniqueInputSchema).array(),
      ])
      .optional(),
  });

export const NotificacaoUncheckedCreateNestedManyWithoutAtendimentoInputSchema: z.ZodType<Prisma.NotificacaoUncheckedCreateNestedManyWithoutAtendimentoInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => NotificacaoCreateWithoutAtendimentoInputSchema),
        z.lazy(() => NotificacaoCreateWithoutAtendimentoInputSchema).array(),
        z.lazy(() => NotificacaoUncheckedCreateWithoutAtendimentoInputSchema),
        z
          .lazy(() => NotificacaoUncheckedCreateWithoutAtendimentoInputSchema)
          .array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => NotificacaoCreateOrConnectWithoutAtendimentoInputSchema),
        z
          .lazy(() => NotificacaoCreateOrConnectWithoutAtendimentoInputSchema)
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => NotificacaoCreateManyAtendimentoInputEnvelopeSchema)
      .optional(),
    connect: z
      .union([
        z.lazy(() => NotificacaoWhereUniqueInputSchema),
        z.lazy(() => NotificacaoWhereUniqueInputSchema).array(),
      ])
      .optional(),
  });

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> =
  z.strictObject({
    set: z.number().optional().nullable(),
    increment: z.number().optional(),
    decrement: z.number().optional(),
    multiply: z.number().optional(),
    divide: z.number().optional(),
  });

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> =
  z.strictObject({
    set: z.number().optional(),
    increment: z.number().optional(),
    decrement: z.number().optional(),
    multiply: z.number().optional(),
    divide: z.number().optional(),
  });

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> =
  z.strictObject({
    set: z.string().optional().nullable(),
  });

export const UsuarioUpdateOneRequiredWithoutAtendimentosRegistradosNestedInputSchema: z.ZodType<Prisma.UsuarioUpdateOneRequiredWithoutAtendimentosRegistradosNestedInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => UsuarioCreateWithoutAtendimentosRegistradosInputSchema),
        z.lazy(
          () => UsuarioUncheckedCreateWithoutAtendimentosRegistradosInputSchema,
        ),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(
        () => UsuarioCreateOrConnectWithoutAtendimentosRegistradosInputSchema,
      )
      .optional(),
    upsert: z
      .lazy(() => UsuarioUpsertWithoutAtendimentosRegistradosInputSchema)
      .optional(),
    connect: z.lazy(() => UsuarioWhereUniqueInputSchema).optional(),
    update: z
      .union([
        z.lazy(
          () =>
            UsuarioUpdateToOneWithWhereWithoutAtendimentosRegistradosInputSchema,
        ),
        z.lazy(() => UsuarioUpdateWithoutAtendimentosRegistradosInputSchema),
        z.lazy(
          () => UsuarioUncheckedUpdateWithoutAtendimentosRegistradosInputSchema,
        ),
      ])
      .optional(),
  });

export const VeiculoAtendimentoUpdateManyWithoutAtendimentoNestedInputSchema: z.ZodType<Prisma.VeiculoAtendimentoUpdateManyWithoutAtendimentoNestedInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => VeiculoAtendimentoCreateWithoutAtendimentoInputSchema),
        z
          .lazy(() => VeiculoAtendimentoCreateWithoutAtendimentoInputSchema)
          .array(),
        z.lazy(
          () => VeiculoAtendimentoUncheckedCreateWithoutAtendimentoInputSchema,
        ),
        z
          .lazy(
            () =>
              VeiculoAtendimentoUncheckedCreateWithoutAtendimentoInputSchema,
          )
          .array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(
          () => VeiculoAtendimentoCreateOrConnectWithoutAtendimentoInputSchema,
        ),
        z
          .lazy(
            () =>
              VeiculoAtendimentoCreateOrConnectWithoutAtendimentoInputSchema,
          )
          .array(),
      ])
      .optional(),
    upsert: z
      .union([
        z.lazy(
          () =>
            VeiculoAtendimentoUpsertWithWhereUniqueWithoutAtendimentoInputSchema,
        ),
        z
          .lazy(
            () =>
              VeiculoAtendimentoUpsertWithWhereUniqueWithoutAtendimentoInputSchema,
          )
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => VeiculoAtendimentoCreateManyAtendimentoInputEnvelopeSchema)
      .optional(),
    set: z
      .union([
        z.lazy(() => VeiculoAtendimentoWhereUniqueInputSchema),
        z.lazy(() => VeiculoAtendimentoWhereUniqueInputSchema).array(),
      ])
      .optional(),
    disconnect: z
      .union([
        z.lazy(() => VeiculoAtendimentoWhereUniqueInputSchema),
        z.lazy(() => VeiculoAtendimentoWhereUniqueInputSchema).array(),
      ])
      .optional(),
    delete: z
      .union([
        z.lazy(() => VeiculoAtendimentoWhereUniqueInputSchema),
        z.lazy(() => VeiculoAtendimentoWhereUniqueInputSchema).array(),
      ])
      .optional(),
    connect: z
      .union([
        z.lazy(() => VeiculoAtendimentoWhereUniqueInputSchema),
        z.lazy(() => VeiculoAtendimentoWhereUniqueInputSchema).array(),
      ])
      .optional(),
    update: z
      .union([
        z.lazy(
          () =>
            VeiculoAtendimentoUpdateWithWhereUniqueWithoutAtendimentoInputSchema,
        ),
        z
          .lazy(
            () =>
              VeiculoAtendimentoUpdateWithWhereUniqueWithoutAtendimentoInputSchema,
          )
          .array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(
          () =>
            VeiculoAtendimentoUpdateManyWithWhereWithoutAtendimentoInputSchema,
        ),
        z
          .lazy(
            () =>
              VeiculoAtendimentoUpdateManyWithWhereWithoutAtendimentoInputSchema,
          )
          .array(),
      ])
      .optional(),
    deleteMany: z
      .union([
        z.lazy(() => VeiculoAtendimentoScalarWhereInputSchema),
        z.lazy(() => VeiculoAtendimentoScalarWhereInputSchema).array(),
      ])
      .optional(),
  });

export const NotificacaoUpdateManyWithoutAtendimentoNestedInputSchema: z.ZodType<Prisma.NotificacaoUpdateManyWithoutAtendimentoNestedInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => NotificacaoCreateWithoutAtendimentoInputSchema),
        z.lazy(() => NotificacaoCreateWithoutAtendimentoInputSchema).array(),
        z.lazy(() => NotificacaoUncheckedCreateWithoutAtendimentoInputSchema),
        z
          .lazy(() => NotificacaoUncheckedCreateWithoutAtendimentoInputSchema)
          .array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => NotificacaoCreateOrConnectWithoutAtendimentoInputSchema),
        z
          .lazy(() => NotificacaoCreateOrConnectWithoutAtendimentoInputSchema)
          .array(),
      ])
      .optional(),
    upsert: z
      .union([
        z.lazy(
          () => NotificacaoUpsertWithWhereUniqueWithoutAtendimentoInputSchema,
        ),
        z
          .lazy(
            () => NotificacaoUpsertWithWhereUniqueWithoutAtendimentoInputSchema,
          )
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => NotificacaoCreateManyAtendimentoInputEnvelopeSchema)
      .optional(),
    set: z
      .union([
        z.lazy(() => NotificacaoWhereUniqueInputSchema),
        z.lazy(() => NotificacaoWhereUniqueInputSchema).array(),
      ])
      .optional(),
    disconnect: z
      .union([
        z.lazy(() => NotificacaoWhereUniqueInputSchema),
        z.lazy(() => NotificacaoWhereUniqueInputSchema).array(),
      ])
      .optional(),
    delete: z
      .union([
        z.lazy(() => NotificacaoWhereUniqueInputSchema),
        z.lazy(() => NotificacaoWhereUniqueInputSchema).array(),
      ])
      .optional(),
    connect: z
      .union([
        z.lazy(() => NotificacaoWhereUniqueInputSchema),
        z.lazy(() => NotificacaoWhereUniqueInputSchema).array(),
      ])
      .optional(),
    update: z
      .union([
        z.lazy(
          () => NotificacaoUpdateWithWhereUniqueWithoutAtendimentoInputSchema,
        ),
        z
          .lazy(
            () => NotificacaoUpdateWithWhereUniqueWithoutAtendimentoInputSchema,
          )
          .array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(
          () => NotificacaoUpdateManyWithWhereWithoutAtendimentoInputSchema,
        ),
        z
          .lazy(
            () => NotificacaoUpdateManyWithWhereWithoutAtendimentoInputSchema,
          )
          .array(),
      ])
      .optional(),
    deleteMany: z
      .union([
        z.lazy(() => NotificacaoScalarWhereInputSchema),
        z.lazy(() => NotificacaoScalarWhereInputSchema).array(),
      ])
      .optional(),
  });

export const VeiculoAtendimentoUncheckedUpdateManyWithoutAtendimentoNestedInputSchema: z.ZodType<Prisma.VeiculoAtendimentoUncheckedUpdateManyWithoutAtendimentoNestedInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => VeiculoAtendimentoCreateWithoutAtendimentoInputSchema),
        z
          .lazy(() => VeiculoAtendimentoCreateWithoutAtendimentoInputSchema)
          .array(),
        z.lazy(
          () => VeiculoAtendimentoUncheckedCreateWithoutAtendimentoInputSchema,
        ),
        z
          .lazy(
            () =>
              VeiculoAtendimentoUncheckedCreateWithoutAtendimentoInputSchema,
          )
          .array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(
          () => VeiculoAtendimentoCreateOrConnectWithoutAtendimentoInputSchema,
        ),
        z
          .lazy(
            () =>
              VeiculoAtendimentoCreateOrConnectWithoutAtendimentoInputSchema,
          )
          .array(),
      ])
      .optional(),
    upsert: z
      .union([
        z.lazy(
          () =>
            VeiculoAtendimentoUpsertWithWhereUniqueWithoutAtendimentoInputSchema,
        ),
        z
          .lazy(
            () =>
              VeiculoAtendimentoUpsertWithWhereUniqueWithoutAtendimentoInputSchema,
          )
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => VeiculoAtendimentoCreateManyAtendimentoInputEnvelopeSchema)
      .optional(),
    set: z
      .union([
        z.lazy(() => VeiculoAtendimentoWhereUniqueInputSchema),
        z.lazy(() => VeiculoAtendimentoWhereUniqueInputSchema).array(),
      ])
      .optional(),
    disconnect: z
      .union([
        z.lazy(() => VeiculoAtendimentoWhereUniqueInputSchema),
        z.lazy(() => VeiculoAtendimentoWhereUniqueInputSchema).array(),
      ])
      .optional(),
    delete: z
      .union([
        z.lazy(() => VeiculoAtendimentoWhereUniqueInputSchema),
        z.lazy(() => VeiculoAtendimentoWhereUniqueInputSchema).array(),
      ])
      .optional(),
    connect: z
      .union([
        z.lazy(() => VeiculoAtendimentoWhereUniqueInputSchema),
        z.lazy(() => VeiculoAtendimentoWhereUniqueInputSchema).array(),
      ])
      .optional(),
    update: z
      .union([
        z.lazy(
          () =>
            VeiculoAtendimentoUpdateWithWhereUniqueWithoutAtendimentoInputSchema,
        ),
        z
          .lazy(
            () =>
              VeiculoAtendimentoUpdateWithWhereUniqueWithoutAtendimentoInputSchema,
          )
          .array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(
          () =>
            VeiculoAtendimentoUpdateManyWithWhereWithoutAtendimentoInputSchema,
        ),
        z
          .lazy(
            () =>
              VeiculoAtendimentoUpdateManyWithWhereWithoutAtendimentoInputSchema,
          )
          .array(),
      ])
      .optional(),
    deleteMany: z
      .union([
        z.lazy(() => VeiculoAtendimentoScalarWhereInputSchema),
        z.lazy(() => VeiculoAtendimentoScalarWhereInputSchema).array(),
      ])
      .optional(),
  });

export const NotificacaoUncheckedUpdateManyWithoutAtendimentoNestedInputSchema: z.ZodType<Prisma.NotificacaoUncheckedUpdateManyWithoutAtendimentoNestedInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => NotificacaoCreateWithoutAtendimentoInputSchema),
        z.lazy(() => NotificacaoCreateWithoutAtendimentoInputSchema).array(),
        z.lazy(() => NotificacaoUncheckedCreateWithoutAtendimentoInputSchema),
        z
          .lazy(() => NotificacaoUncheckedCreateWithoutAtendimentoInputSchema)
          .array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => NotificacaoCreateOrConnectWithoutAtendimentoInputSchema),
        z
          .lazy(() => NotificacaoCreateOrConnectWithoutAtendimentoInputSchema)
          .array(),
      ])
      .optional(),
    upsert: z
      .union([
        z.lazy(
          () => NotificacaoUpsertWithWhereUniqueWithoutAtendimentoInputSchema,
        ),
        z
          .lazy(
            () => NotificacaoUpsertWithWhereUniqueWithoutAtendimentoInputSchema,
          )
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => NotificacaoCreateManyAtendimentoInputEnvelopeSchema)
      .optional(),
    set: z
      .union([
        z.lazy(() => NotificacaoWhereUniqueInputSchema),
        z.lazy(() => NotificacaoWhereUniqueInputSchema).array(),
      ])
      .optional(),
    disconnect: z
      .union([
        z.lazy(() => NotificacaoWhereUniqueInputSchema),
        z.lazy(() => NotificacaoWhereUniqueInputSchema).array(),
      ])
      .optional(),
    delete: z
      .union([
        z.lazy(() => NotificacaoWhereUniqueInputSchema),
        z.lazy(() => NotificacaoWhereUniqueInputSchema).array(),
      ])
      .optional(),
    connect: z
      .union([
        z.lazy(() => NotificacaoWhereUniqueInputSchema),
        z.lazy(() => NotificacaoWhereUniqueInputSchema).array(),
      ])
      .optional(),
    update: z
      .union([
        z.lazy(
          () => NotificacaoUpdateWithWhereUniqueWithoutAtendimentoInputSchema,
        ),
        z
          .lazy(
            () => NotificacaoUpdateWithWhereUniqueWithoutAtendimentoInputSchema,
          )
          .array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(
          () => NotificacaoUpdateManyWithWhereWithoutAtendimentoInputSchema,
        ),
        z
          .lazy(
            () => NotificacaoUpdateManyWithWhereWithoutAtendimentoInputSchema,
          )
          .array(),
      ])
      .optional(),
    deleteMany: z
      .union([
        z.lazy(() => NotificacaoScalarWhereInputSchema),
        z.lazy(() => NotificacaoScalarWhereInputSchema).array(),
      ])
      .optional(),
  });

export const VeiculoCreateNestedOneWithoutAtendimentosInputSchema: z.ZodType<Prisma.VeiculoCreateNestedOneWithoutAtendimentosInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => VeiculoCreateWithoutAtendimentosInputSchema),
        z.lazy(() => VeiculoUncheckedCreateWithoutAtendimentosInputSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => VeiculoCreateOrConnectWithoutAtendimentosInputSchema)
      .optional(),
    connect: z.lazy(() => VeiculoWhereUniqueInputSchema).optional(),
  });

export const AtendimentoCreateNestedOneWithoutVeiculosInputSchema: z.ZodType<Prisma.AtendimentoCreateNestedOneWithoutVeiculosInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => AtendimentoCreateWithoutVeiculosInputSchema),
        z.lazy(() => AtendimentoUncheckedCreateWithoutVeiculosInputSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => AtendimentoCreateOrConnectWithoutVeiculosInputSchema)
      .optional(),
    connect: z.lazy(() => AtendimentoWhereUniqueInputSchema).optional(),
  });

export const EnumStatusAtendimentoFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumStatusAtendimentoFieldUpdateOperationsInput> =
  z.strictObject({
    set: z.lazy(() => StatusAtendimentoSchema).optional(),
  });

export const VeiculoUpdateOneRequiredWithoutAtendimentosNestedInputSchema: z.ZodType<Prisma.VeiculoUpdateOneRequiredWithoutAtendimentosNestedInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => VeiculoCreateWithoutAtendimentosInputSchema),
        z.lazy(() => VeiculoUncheckedCreateWithoutAtendimentosInputSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => VeiculoCreateOrConnectWithoutAtendimentosInputSchema)
      .optional(),
    upsert: z
      .lazy(() => VeiculoUpsertWithoutAtendimentosInputSchema)
      .optional(),
    connect: z.lazy(() => VeiculoWhereUniqueInputSchema).optional(),
    update: z
      .union([
        z.lazy(() => VeiculoUpdateToOneWithWhereWithoutAtendimentosInputSchema),
        z.lazy(() => VeiculoUpdateWithoutAtendimentosInputSchema),
        z.lazy(() => VeiculoUncheckedUpdateWithoutAtendimentosInputSchema),
      ])
      .optional(),
  });

export const AtendimentoUpdateOneRequiredWithoutVeiculosNestedInputSchema: z.ZodType<Prisma.AtendimentoUpdateOneRequiredWithoutVeiculosNestedInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => AtendimentoCreateWithoutVeiculosInputSchema),
        z.lazy(() => AtendimentoUncheckedCreateWithoutVeiculosInputSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => AtendimentoCreateOrConnectWithoutVeiculosInputSchema)
      .optional(),
    upsert: z
      .lazy(() => AtendimentoUpsertWithoutVeiculosInputSchema)
      .optional(),
    connect: z.lazy(() => AtendimentoWhereUniqueInputSchema).optional(),
    update: z
      .union([
        z.lazy(() => AtendimentoUpdateToOneWithWhereWithoutVeiculosInputSchema),
        z.lazy(() => AtendimentoUpdateWithoutVeiculosInputSchema),
        z.lazy(() => AtendimentoUncheckedUpdateWithoutVeiculosInputSchema),
      ])
      .optional(),
  });

export const UsuarioCreateNestedOneWithoutConversasComoAtendenteInputSchema: z.ZodType<Prisma.UsuarioCreateNestedOneWithoutConversasComoAtendenteInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => UsuarioCreateWithoutConversasComoAtendenteInputSchema),
        z.lazy(
          () => UsuarioUncheckedCreateWithoutConversasComoAtendenteInputSchema,
        ),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(
        () => UsuarioCreateOrConnectWithoutConversasComoAtendenteInputSchema,
      )
      .optional(),
    connect: z.lazy(() => UsuarioWhereUniqueInputSchema).optional(),
  });

export const UsuarioCreateNestedOneWithoutConversasComoMotoristaInputSchema: z.ZodType<Prisma.UsuarioCreateNestedOneWithoutConversasComoMotoristaInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => UsuarioCreateWithoutConversasComoMotoristaInputSchema),
        z.lazy(
          () => UsuarioUncheckedCreateWithoutConversasComoMotoristaInputSchema,
        ),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(
        () => UsuarioCreateOrConnectWithoutConversasComoMotoristaInputSchema,
      )
      .optional(),
    connect: z.lazy(() => UsuarioWhereUniqueInputSchema).optional(),
  });

export const MensagemCreateNestedManyWithoutConversaInputSchema: z.ZodType<Prisma.MensagemCreateNestedManyWithoutConversaInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => MensagemCreateWithoutConversaInputSchema),
        z.lazy(() => MensagemCreateWithoutConversaInputSchema).array(),
        z.lazy(() => MensagemUncheckedCreateWithoutConversaInputSchema),
        z.lazy(() => MensagemUncheckedCreateWithoutConversaInputSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => MensagemCreateOrConnectWithoutConversaInputSchema),
        z.lazy(() => MensagemCreateOrConnectWithoutConversaInputSchema).array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => MensagemCreateManyConversaInputEnvelopeSchema)
      .optional(),
    connect: z
      .union([
        z.lazy(() => MensagemWhereUniqueInputSchema),
        z.lazy(() => MensagemWhereUniqueInputSchema).array(),
      ])
      .optional(),
  });

export const MensagemUncheckedCreateNestedManyWithoutConversaInputSchema: z.ZodType<Prisma.MensagemUncheckedCreateNestedManyWithoutConversaInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => MensagemCreateWithoutConversaInputSchema),
        z.lazy(() => MensagemCreateWithoutConversaInputSchema).array(),
        z.lazy(() => MensagemUncheckedCreateWithoutConversaInputSchema),
        z.lazy(() => MensagemUncheckedCreateWithoutConversaInputSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => MensagemCreateOrConnectWithoutConversaInputSchema),
        z.lazy(() => MensagemCreateOrConnectWithoutConversaInputSchema).array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => MensagemCreateManyConversaInputEnvelopeSchema)
      .optional(),
    connect: z
      .union([
        z.lazy(() => MensagemWhereUniqueInputSchema),
        z.lazy(() => MensagemWhereUniqueInputSchema).array(),
      ])
      .optional(),
  });

export const UsuarioUpdateOneRequiredWithoutConversasComoAtendenteNestedInputSchema: z.ZodType<Prisma.UsuarioUpdateOneRequiredWithoutConversasComoAtendenteNestedInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => UsuarioCreateWithoutConversasComoAtendenteInputSchema),
        z.lazy(
          () => UsuarioUncheckedCreateWithoutConversasComoAtendenteInputSchema,
        ),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(
        () => UsuarioCreateOrConnectWithoutConversasComoAtendenteInputSchema,
      )
      .optional(),
    upsert: z
      .lazy(() => UsuarioUpsertWithoutConversasComoAtendenteInputSchema)
      .optional(),
    connect: z.lazy(() => UsuarioWhereUniqueInputSchema).optional(),
    update: z
      .union([
        z.lazy(
          () =>
            UsuarioUpdateToOneWithWhereWithoutConversasComoAtendenteInputSchema,
        ),
        z.lazy(() => UsuarioUpdateWithoutConversasComoAtendenteInputSchema),
        z.lazy(
          () => UsuarioUncheckedUpdateWithoutConversasComoAtendenteInputSchema,
        ),
      ])
      .optional(),
  });

export const UsuarioUpdateOneRequiredWithoutConversasComoMotoristaNestedInputSchema: z.ZodType<Prisma.UsuarioUpdateOneRequiredWithoutConversasComoMotoristaNestedInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => UsuarioCreateWithoutConversasComoMotoristaInputSchema),
        z.lazy(
          () => UsuarioUncheckedCreateWithoutConversasComoMotoristaInputSchema,
        ),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(
        () => UsuarioCreateOrConnectWithoutConversasComoMotoristaInputSchema,
      )
      .optional(),
    upsert: z
      .lazy(() => UsuarioUpsertWithoutConversasComoMotoristaInputSchema)
      .optional(),
    connect: z.lazy(() => UsuarioWhereUniqueInputSchema).optional(),
    update: z
      .union([
        z.lazy(
          () =>
            UsuarioUpdateToOneWithWhereWithoutConversasComoMotoristaInputSchema,
        ),
        z.lazy(() => UsuarioUpdateWithoutConversasComoMotoristaInputSchema),
        z.lazy(
          () => UsuarioUncheckedUpdateWithoutConversasComoMotoristaInputSchema,
        ),
      ])
      .optional(),
  });

export const MensagemUpdateManyWithoutConversaNestedInputSchema: z.ZodType<Prisma.MensagemUpdateManyWithoutConversaNestedInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => MensagemCreateWithoutConversaInputSchema),
        z.lazy(() => MensagemCreateWithoutConversaInputSchema).array(),
        z.lazy(() => MensagemUncheckedCreateWithoutConversaInputSchema),
        z.lazy(() => MensagemUncheckedCreateWithoutConversaInputSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => MensagemCreateOrConnectWithoutConversaInputSchema),
        z.lazy(() => MensagemCreateOrConnectWithoutConversaInputSchema).array(),
      ])
      .optional(),
    upsert: z
      .union([
        z.lazy(() => MensagemUpsertWithWhereUniqueWithoutConversaInputSchema),
        z
          .lazy(() => MensagemUpsertWithWhereUniqueWithoutConversaInputSchema)
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => MensagemCreateManyConversaInputEnvelopeSchema)
      .optional(),
    set: z
      .union([
        z.lazy(() => MensagemWhereUniqueInputSchema),
        z.lazy(() => MensagemWhereUniqueInputSchema).array(),
      ])
      .optional(),
    disconnect: z
      .union([
        z.lazy(() => MensagemWhereUniqueInputSchema),
        z.lazy(() => MensagemWhereUniqueInputSchema).array(),
      ])
      .optional(),
    delete: z
      .union([
        z.lazy(() => MensagemWhereUniqueInputSchema),
        z.lazy(() => MensagemWhereUniqueInputSchema).array(),
      ])
      .optional(),
    connect: z
      .union([
        z.lazy(() => MensagemWhereUniqueInputSchema),
        z.lazy(() => MensagemWhereUniqueInputSchema).array(),
      ])
      .optional(),
    update: z
      .union([
        z.lazy(() => MensagemUpdateWithWhereUniqueWithoutConversaInputSchema),
        z
          .lazy(() => MensagemUpdateWithWhereUniqueWithoutConversaInputSchema)
          .array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => MensagemUpdateManyWithWhereWithoutConversaInputSchema),
        z
          .lazy(() => MensagemUpdateManyWithWhereWithoutConversaInputSchema)
          .array(),
      ])
      .optional(),
    deleteMany: z
      .union([
        z.lazy(() => MensagemScalarWhereInputSchema),
        z.lazy(() => MensagemScalarWhereInputSchema).array(),
      ])
      .optional(),
  });

export const MensagemUncheckedUpdateManyWithoutConversaNestedInputSchema: z.ZodType<Prisma.MensagemUncheckedUpdateManyWithoutConversaNestedInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => MensagemCreateWithoutConversaInputSchema),
        z.lazy(() => MensagemCreateWithoutConversaInputSchema).array(),
        z.lazy(() => MensagemUncheckedCreateWithoutConversaInputSchema),
        z.lazy(() => MensagemUncheckedCreateWithoutConversaInputSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => MensagemCreateOrConnectWithoutConversaInputSchema),
        z.lazy(() => MensagemCreateOrConnectWithoutConversaInputSchema).array(),
      ])
      .optional(),
    upsert: z
      .union([
        z.lazy(() => MensagemUpsertWithWhereUniqueWithoutConversaInputSchema),
        z
          .lazy(() => MensagemUpsertWithWhereUniqueWithoutConversaInputSchema)
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => MensagemCreateManyConversaInputEnvelopeSchema)
      .optional(),
    set: z
      .union([
        z.lazy(() => MensagemWhereUniqueInputSchema),
        z.lazy(() => MensagemWhereUniqueInputSchema).array(),
      ])
      .optional(),
    disconnect: z
      .union([
        z.lazy(() => MensagemWhereUniqueInputSchema),
        z.lazy(() => MensagemWhereUniqueInputSchema).array(),
      ])
      .optional(),
    delete: z
      .union([
        z.lazy(() => MensagemWhereUniqueInputSchema),
        z.lazy(() => MensagemWhereUniqueInputSchema).array(),
      ])
      .optional(),
    connect: z
      .union([
        z.lazy(() => MensagemWhereUniqueInputSchema),
        z.lazy(() => MensagemWhereUniqueInputSchema).array(),
      ])
      .optional(),
    update: z
      .union([
        z.lazy(() => MensagemUpdateWithWhereUniqueWithoutConversaInputSchema),
        z
          .lazy(() => MensagemUpdateWithWhereUniqueWithoutConversaInputSchema)
          .array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => MensagemUpdateManyWithWhereWithoutConversaInputSchema),
        z
          .lazy(() => MensagemUpdateManyWithWhereWithoutConversaInputSchema)
          .array(),
      ])
      .optional(),
    deleteMany: z
      .union([
        z.lazy(() => MensagemScalarWhereInputSchema),
        z.lazy(() => MensagemScalarWhereInputSchema).array(),
      ])
      .optional(),
  });

export const UsuarioCreateNestedOneWithoutMensagensEnviadasInputSchema: z.ZodType<Prisma.UsuarioCreateNestedOneWithoutMensagensEnviadasInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => UsuarioCreateWithoutMensagensEnviadasInputSchema),
        z.lazy(() => UsuarioUncheckedCreateWithoutMensagensEnviadasInputSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => UsuarioCreateOrConnectWithoutMensagensEnviadasInputSchema)
      .optional(),
    connect: z.lazy(() => UsuarioWhereUniqueInputSchema).optional(),
  });

export const ConversaCreateNestedOneWithoutMensagensInputSchema: z.ZodType<Prisma.ConversaCreateNestedOneWithoutMensagensInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => ConversaCreateWithoutMensagensInputSchema),
        z.lazy(() => ConversaUncheckedCreateWithoutMensagensInputSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => ConversaCreateOrConnectWithoutMensagensInputSchema)
      .optional(),
    connect: z.lazy(() => ConversaWhereUniqueInputSchema).optional(),
  });

export const UsuarioUpdateOneRequiredWithoutMensagensEnviadasNestedInputSchema: z.ZodType<Prisma.UsuarioUpdateOneRequiredWithoutMensagensEnviadasNestedInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => UsuarioCreateWithoutMensagensEnviadasInputSchema),
        z.lazy(() => UsuarioUncheckedCreateWithoutMensagensEnviadasInputSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => UsuarioCreateOrConnectWithoutMensagensEnviadasInputSchema)
      .optional(),
    upsert: z
      .lazy(() => UsuarioUpsertWithoutMensagensEnviadasInputSchema)
      .optional(),
    connect: z.lazy(() => UsuarioWhereUniqueInputSchema).optional(),
    update: z
      .union([
        z.lazy(
          () => UsuarioUpdateToOneWithWhereWithoutMensagensEnviadasInputSchema,
        ),
        z.lazy(() => UsuarioUpdateWithoutMensagensEnviadasInputSchema),
        z.lazy(() => UsuarioUncheckedUpdateWithoutMensagensEnviadasInputSchema),
      ])
      .optional(),
  });

export const ConversaUpdateOneRequiredWithoutMensagensNestedInputSchema: z.ZodType<Prisma.ConversaUpdateOneRequiredWithoutMensagensNestedInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => ConversaCreateWithoutMensagensInputSchema),
        z.lazy(() => ConversaUncheckedCreateWithoutMensagensInputSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => ConversaCreateOrConnectWithoutMensagensInputSchema)
      .optional(),
    upsert: z.lazy(() => ConversaUpsertWithoutMensagensInputSchema).optional(),
    connect: z.lazy(() => ConversaWhereUniqueInputSchema).optional(),
    update: z
      .union([
        z.lazy(() => ConversaUpdateToOneWithWhereWithoutMensagensInputSchema),
        z.lazy(() => ConversaUpdateWithoutMensagensInputSchema),
        z.lazy(() => ConversaUncheckedUpdateWithoutMensagensInputSchema),
      ])
      .optional(),
  });

export const AtendimentoCreateNestedOneWithoutNotificacoesInputSchema: z.ZodType<Prisma.AtendimentoCreateNestedOneWithoutNotificacoesInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => AtendimentoCreateWithoutNotificacoesInputSchema),
        z.lazy(() => AtendimentoUncheckedCreateWithoutNotificacoesInputSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => AtendimentoCreateOrConnectWithoutNotificacoesInputSchema)
      .optional(),
    connect: z.lazy(() => AtendimentoWhereUniqueInputSchema).optional(),
  });

export const AtendimentoUpdateOneRequiredWithoutNotificacoesNestedInputSchema: z.ZodType<Prisma.AtendimentoUpdateOneRequiredWithoutNotificacoesNestedInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => AtendimentoCreateWithoutNotificacoesInputSchema),
        z.lazy(() => AtendimentoUncheckedCreateWithoutNotificacoesInputSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => AtendimentoCreateOrConnectWithoutNotificacoesInputSchema)
      .optional(),
    upsert: z
      .lazy(() => AtendimentoUpsertWithoutNotificacoesInputSchema)
      .optional(),
    connect: z.lazy(() => AtendimentoWhereUniqueInputSchema).optional(),
    update: z
      .union([
        z.lazy(
          () => AtendimentoUpdateToOneWithWhereWithoutNotificacoesInputSchema,
        ),
        z.lazy(() => AtendimentoUpdateWithoutNotificacoesInputSchema),
        z.lazy(() => AtendimentoUncheckedUpdateWithoutNotificacoesInputSchema),
      ])
      .optional(),
  });

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> =
  z.strictObject({
    equals: z.string().optional(),
    in: z.string().array().optional(),
    notIn: z.string().array().optional(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    not: z
      .union([z.string(), z.lazy(() => NestedStringFilterSchema)])
      .optional(),
  });

export const NestedEnumTipoUsuarioFilterSchema: z.ZodType<Prisma.NestedEnumTipoUsuarioFilter> =
  z.strictObject({
    equals: z.lazy(() => TipoUsuarioSchema).optional(),
    in: z
      .lazy(() => TipoUsuarioSchema)
      .array()
      .optional(),
    notIn: z
      .lazy(() => TipoUsuarioSchema)
      .array()
      .optional(),
    not: z
      .union([
        z.lazy(() => TipoUsuarioSchema),
        z.lazy(() => NestedEnumTipoUsuarioFilterSchema),
      ])
      .optional(),
  });

export const NestedEnumStatusUsuarioFilterSchema: z.ZodType<Prisma.NestedEnumStatusUsuarioFilter> =
  z.strictObject({
    equals: z.lazy(() => StatusUsuarioSchema).optional(),
    in: z
      .lazy(() => StatusUsuarioSchema)
      .array()
      .optional(),
    notIn: z
      .lazy(() => StatusUsuarioSchema)
      .array()
      .optional(),
    not: z
      .union([
        z.lazy(() => StatusUsuarioSchema),
        z.lazy(() => NestedEnumStatusUsuarioFilterSchema),
      ])
      .optional(),
  });

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> =
  z.strictObject({
    equals: z.coerce.date().optional(),
    in: z.coerce.date().array().optional(),
    notIn: z.coerce.date().array().optional(),
    lt: z.coerce.date().optional(),
    lte: z.coerce.date().optional(),
    gt: z.coerce.date().optional(),
    gte: z.coerce.date().optional(),
    not: z
      .union([z.coerce.date(), z.lazy(() => NestedDateTimeFilterSchema)])
      .optional(),
  });

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> =
  z.strictObject({
    equals: z.string().optional(),
    in: z.string().array().optional(),
    notIn: z.string().array().optional(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    not: z
      .union([z.string(), z.lazy(() => NestedStringWithAggregatesFilterSchema)])
      .optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _min: z.lazy(() => NestedStringFilterSchema).optional(),
    _max: z.lazy(() => NestedStringFilterSchema).optional(),
  });

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> =
  z.strictObject({
    equals: z.number().optional(),
    in: z.number().array().optional(),
    notIn: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z.union([z.number(), z.lazy(() => NestedIntFilterSchema)]).optional(),
  });

export const NestedEnumTipoUsuarioWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumTipoUsuarioWithAggregatesFilter> =
  z.strictObject({
    equals: z.lazy(() => TipoUsuarioSchema).optional(),
    in: z
      .lazy(() => TipoUsuarioSchema)
      .array()
      .optional(),
    notIn: z
      .lazy(() => TipoUsuarioSchema)
      .array()
      .optional(),
    not: z
      .union([
        z.lazy(() => TipoUsuarioSchema),
        z.lazy(() => NestedEnumTipoUsuarioWithAggregatesFilterSchema),
      ])
      .optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _min: z.lazy(() => NestedEnumTipoUsuarioFilterSchema).optional(),
    _max: z.lazy(() => NestedEnumTipoUsuarioFilterSchema).optional(),
  });

export const NestedEnumStatusUsuarioWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumStatusUsuarioWithAggregatesFilter> =
  z.strictObject({
    equals: z.lazy(() => StatusUsuarioSchema).optional(),
    in: z
      .lazy(() => StatusUsuarioSchema)
      .array()
      .optional(),
    notIn: z
      .lazy(() => StatusUsuarioSchema)
      .array()
      .optional(),
    not: z
      .union([
        z.lazy(() => StatusUsuarioSchema),
        z.lazy(() => NestedEnumStatusUsuarioWithAggregatesFilterSchema),
      ])
      .optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _min: z.lazy(() => NestedEnumStatusUsuarioFilterSchema).optional(),
    _max: z.lazy(() => NestedEnumStatusUsuarioFilterSchema).optional(),
  });

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> =
  z.strictObject({
    equals: z.coerce.date().optional(),
    in: z.coerce.date().array().optional(),
    notIn: z.coerce.date().array().optional(),
    lt: z.coerce.date().optional(),
    lte: z.coerce.date().optional(),
    gt: z.coerce.date().optional(),
    gte: z.coerce.date().optional(),
    not: z
      .union([
        z.coerce.date(),
        z.lazy(() => NestedDateTimeWithAggregatesFilterSchema),
      ])
      .optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
    _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  });

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> =
  z.strictObject({
    equals: z.number().optional(),
    in: z.number().array().optional(),
    notIn: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z
      .union([z.number(), z.lazy(() => NestedFloatFilterSchema)])
      .optional(),
  });

export const NestedFloatWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatWithAggregatesFilter> =
  z.strictObject({
    equals: z.number().optional(),
    in: z.number().array().optional(),
    notIn: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z
      .union([z.number(), z.lazy(() => NestedFloatWithAggregatesFilterSchema)])
      .optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
    _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
    _min: z.lazy(() => NestedFloatFilterSchema).optional(),
    _max: z.lazy(() => NestedFloatFilterSchema).optional(),
  });

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> =
  z.strictObject({
    equals: z.number().optional().nullable(),
    in: z.number().array().optional().nullable(),
    notIn: z.number().array().optional().nullable(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z
      .union([z.number(), z.lazy(() => NestedIntNullableFilterSchema)])
      .optional()
      .nullable(),
  });

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> =
  z.strictObject({
    equals: z.string().optional().nullable(),
    in: z.string().array().optional().nullable(),
    notIn: z.string().array().optional().nullable(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    not: z
      .union([z.string(), z.lazy(() => NestedStringNullableFilterSchema)])
      .optional()
      .nullable(),
  });

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> =
  z.strictObject({
    equals: z.number().optional().nullable(),
    in: z.number().array().optional().nullable(),
    notIn: z.number().array().optional().nullable(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z
      .union([
        z.number(),
        z.lazy(() => NestedIntNullableWithAggregatesFilterSchema),
      ])
      .optional()
      .nullable(),
    _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
    _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
    _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
    _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
    _max: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  });

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> =
  z.strictObject({
    equals: z.number().optional().nullable(),
    in: z.number().array().optional().nullable(),
    notIn: z.number().array().optional().nullable(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z
      .union([z.number(), z.lazy(() => NestedFloatNullableFilterSchema)])
      .optional()
      .nullable(),
  });

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> =
  z.strictObject({
    equals: z.number().optional(),
    in: z.number().array().optional(),
    notIn: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z
      .union([z.number(), z.lazy(() => NestedIntWithAggregatesFilterSchema)])
      .optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
    _sum: z.lazy(() => NestedIntFilterSchema).optional(),
    _min: z.lazy(() => NestedIntFilterSchema).optional(),
    _max: z.lazy(() => NestedIntFilterSchema).optional(),
  });

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> =
  z.strictObject({
    equals: z.string().optional().nullable(),
    in: z.string().array().optional().nullable(),
    notIn: z.string().array().optional().nullable(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    not: z
      .union([
        z.string(),
        z.lazy(() => NestedStringNullableWithAggregatesFilterSchema),
      ])
      .optional()
      .nullable(),
    _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
    _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
    _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  });

export const NestedEnumStatusAtendimentoFilterSchema: z.ZodType<Prisma.NestedEnumStatusAtendimentoFilter> =
  z.strictObject({
    equals: z.lazy(() => StatusAtendimentoSchema).optional(),
    in: z
      .lazy(() => StatusAtendimentoSchema)
      .array()
      .optional(),
    notIn: z
      .lazy(() => StatusAtendimentoSchema)
      .array()
      .optional(),
    not: z
      .union([
        z.lazy(() => StatusAtendimentoSchema),
        z.lazy(() => NestedEnumStatusAtendimentoFilterSchema),
      ])
      .optional(),
  });

export const NestedEnumStatusAtendimentoWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumStatusAtendimentoWithAggregatesFilter> =
  z.strictObject({
    equals: z.lazy(() => StatusAtendimentoSchema).optional(),
    in: z
      .lazy(() => StatusAtendimentoSchema)
      .array()
      .optional(),
    notIn: z
      .lazy(() => StatusAtendimentoSchema)
      .array()
      .optional(),
    not: z
      .union([
        z.lazy(() => StatusAtendimentoSchema),
        z.lazy(() => NestedEnumStatusAtendimentoWithAggregatesFilterSchema),
      ])
      .optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _min: z.lazy(() => NestedEnumStatusAtendimentoFilterSchema).optional(),
    _max: z.lazy(() => NestedEnumStatusAtendimentoFilterSchema).optional(),
  });

export const VeiculoCreateWithoutMotoristaInputSchema: z.ZodType<Prisma.VeiculoCreateWithoutMotoristaInput> =
  z.strictObject({
    id: z.uuid().optional(),
    placa: z.string(),
    latitude: z.number(),
    longitude: z.number(),
    atendimentos: z
      .lazy(() => VeiculoAtendimentoCreateNestedManyWithoutVeiculoInputSchema)
      .optional(),
  });

export const VeiculoUncheckedCreateWithoutMotoristaInputSchema: z.ZodType<Prisma.VeiculoUncheckedCreateWithoutMotoristaInput> =
  z.strictObject({
    id: z.uuid().optional(),
    placa: z.string(),
    latitude: z.number(),
    longitude: z.number(),
    atendimentos: z
      .lazy(
        () =>
          VeiculoAtendimentoUncheckedCreateNestedManyWithoutVeiculoInputSchema,
      )
      .optional(),
  });

export const VeiculoCreateOrConnectWithoutMotoristaInputSchema: z.ZodType<Prisma.VeiculoCreateOrConnectWithoutMotoristaInput> =
  z.strictObject({
    where: z.lazy(() => VeiculoWhereUniqueInputSchema),
    create: z.union([
      z.lazy(() => VeiculoCreateWithoutMotoristaInputSchema),
      z.lazy(() => VeiculoUncheckedCreateWithoutMotoristaInputSchema),
    ]),
  });

export const AtendimentoCreateWithoutAtendenteInputSchema: z.ZodType<Prisma.AtendimentoCreateWithoutAtendenteInput> =
  z.strictObject({
    id: z.uuid().optional(),
    protocolo: z.string(),
    endereco: z.string(),
    localDeRetorno: z.string(),
    oQueAconteceu: z.string(),
    estadoDoPaciente: z.string(),
    idadeAparente: z.number().int().optional().nullable(),
    quantidadeDePacientes: z.number().int(),
    estadoDaLesao: z.string(),
    observacoes: z.string().optional().nullable(),
    criadoEm: z.coerce.date().optional(),
    veiculos: z
      .lazy(
        () => VeiculoAtendimentoCreateNestedManyWithoutAtendimentoInputSchema,
      )
      .optional(),
    notificacoes: z
      .lazy(() => NotificacaoCreateNestedManyWithoutAtendimentoInputSchema)
      .optional(),
  });

export const AtendimentoUncheckedCreateWithoutAtendenteInputSchema: z.ZodType<Prisma.AtendimentoUncheckedCreateWithoutAtendenteInput> =
  z.strictObject({
    id: z.uuid().optional(),
    protocolo: z.string(),
    endereco: z.string(),
    localDeRetorno: z.string(),
    oQueAconteceu: z.string(),
    estadoDoPaciente: z.string(),
    idadeAparente: z.number().int().optional().nullable(),
    quantidadeDePacientes: z.number().int(),
    estadoDaLesao: z.string(),
    observacoes: z.string().optional().nullable(),
    criadoEm: z.coerce.date().optional(),
    veiculos: z
      .lazy(
        () =>
          VeiculoAtendimentoUncheckedCreateNestedManyWithoutAtendimentoInputSchema,
      )
      .optional(),
    notificacoes: z
      .lazy(
        () => NotificacaoUncheckedCreateNestedManyWithoutAtendimentoInputSchema,
      )
      .optional(),
  });

export const AtendimentoCreateOrConnectWithoutAtendenteInputSchema: z.ZodType<Prisma.AtendimentoCreateOrConnectWithoutAtendenteInput> =
  z.strictObject({
    where: z.lazy(() => AtendimentoWhereUniqueInputSchema),
    create: z.union([
      z.lazy(() => AtendimentoCreateWithoutAtendenteInputSchema),
      z.lazy(() => AtendimentoUncheckedCreateWithoutAtendenteInputSchema),
    ]),
  });

export const AtendimentoCreateManyAtendenteInputEnvelopeSchema: z.ZodType<Prisma.AtendimentoCreateManyAtendenteInputEnvelope> =
  z.strictObject({
    data: z.union([
      z.lazy(() => AtendimentoCreateManyAtendenteInputSchema),
      z.lazy(() => AtendimentoCreateManyAtendenteInputSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  });

export const ConversaCreateWithoutAtendenteInputSchema: z.ZodType<Prisma.ConversaCreateWithoutAtendenteInput> =
  z.strictObject({
    id: z.uuid().optional(),
    motorista: z.lazy(
      () => UsuarioCreateNestedOneWithoutConversasComoMotoristaInputSchema,
    ),
    mensagens: z
      .lazy(() => MensagemCreateNestedManyWithoutConversaInputSchema)
      .optional(),
  });

export const ConversaUncheckedCreateWithoutAtendenteInputSchema: z.ZodType<Prisma.ConversaUncheckedCreateWithoutAtendenteInput> =
  z.strictObject({
    id: z.uuid().optional(),
    motoristaId: z.string(),
    mensagens: z
      .lazy(() => MensagemUncheckedCreateNestedManyWithoutConversaInputSchema)
      .optional(),
  });

export const ConversaCreateOrConnectWithoutAtendenteInputSchema: z.ZodType<Prisma.ConversaCreateOrConnectWithoutAtendenteInput> =
  z.strictObject({
    where: z.lazy(() => ConversaWhereUniqueInputSchema),
    create: z.union([
      z.lazy(() => ConversaCreateWithoutAtendenteInputSchema),
      z.lazy(() => ConversaUncheckedCreateWithoutAtendenteInputSchema),
    ]),
  });

export const ConversaCreateManyAtendenteInputEnvelopeSchema: z.ZodType<Prisma.ConversaCreateManyAtendenteInputEnvelope> =
  z.strictObject({
    data: z.union([
      z.lazy(() => ConversaCreateManyAtendenteInputSchema),
      z.lazy(() => ConversaCreateManyAtendenteInputSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  });

export const ConversaCreateWithoutMotoristaInputSchema: z.ZodType<Prisma.ConversaCreateWithoutMotoristaInput> =
  z.strictObject({
    id: z.uuid().optional(),
    atendente: z.lazy(
      () => UsuarioCreateNestedOneWithoutConversasComoAtendenteInputSchema,
    ),
    mensagens: z
      .lazy(() => MensagemCreateNestedManyWithoutConversaInputSchema)
      .optional(),
  });

export const ConversaUncheckedCreateWithoutMotoristaInputSchema: z.ZodType<Prisma.ConversaUncheckedCreateWithoutMotoristaInput> =
  z.strictObject({
    id: z.uuid().optional(),
    atendenteId: z.string(),
    mensagens: z
      .lazy(() => MensagemUncheckedCreateNestedManyWithoutConversaInputSchema)
      .optional(),
  });

export const ConversaCreateOrConnectWithoutMotoristaInputSchema: z.ZodType<Prisma.ConversaCreateOrConnectWithoutMotoristaInput> =
  z.strictObject({
    where: z.lazy(() => ConversaWhereUniqueInputSchema),
    create: z.union([
      z.lazy(() => ConversaCreateWithoutMotoristaInputSchema),
      z.lazy(() => ConversaUncheckedCreateWithoutMotoristaInputSchema),
    ]),
  });

export const ConversaCreateManyMotoristaInputEnvelopeSchema: z.ZodType<Prisma.ConversaCreateManyMotoristaInputEnvelope> =
  z.strictObject({
    data: z.union([
      z.lazy(() => ConversaCreateManyMotoristaInputSchema),
      z.lazy(() => ConversaCreateManyMotoristaInputSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  });

export const MensagemCreateWithoutQuemMandouInputSchema: z.ZodType<Prisma.MensagemCreateWithoutQuemMandouInput> =
  z.strictObject({
    id: z.uuid().optional(),
    texto: z.string(),
    dataDeEnvio: z.coerce.date().optional(),
    conversa: z.lazy(() => ConversaCreateNestedOneWithoutMensagensInputSchema),
  });

export const MensagemUncheckedCreateWithoutQuemMandouInputSchema: z.ZodType<Prisma.MensagemUncheckedCreateWithoutQuemMandouInput> =
  z.strictObject({
    id: z.uuid().optional(),
    texto: z.string(),
    dataDeEnvio: z.coerce.date().optional(),
    conversaId: z.string(),
  });

export const MensagemCreateOrConnectWithoutQuemMandouInputSchema: z.ZodType<Prisma.MensagemCreateOrConnectWithoutQuemMandouInput> =
  z.strictObject({
    where: z.lazy(() => MensagemWhereUniqueInputSchema),
    create: z.union([
      z.lazy(() => MensagemCreateWithoutQuemMandouInputSchema),
      z.lazy(() => MensagemUncheckedCreateWithoutQuemMandouInputSchema),
    ]),
  });

export const MensagemCreateManyQuemMandouInputEnvelopeSchema: z.ZodType<Prisma.MensagemCreateManyQuemMandouInputEnvelope> =
  z.strictObject({
    data: z.union([
      z.lazy(() => MensagemCreateManyQuemMandouInputSchema),
      z.lazy(() => MensagemCreateManyQuemMandouInputSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  });

export const VeiculoUpsertWithoutMotoristaInputSchema: z.ZodType<Prisma.VeiculoUpsertWithoutMotoristaInput> =
  z.strictObject({
    update: z.union([
      z.lazy(() => VeiculoUpdateWithoutMotoristaInputSchema),
      z.lazy(() => VeiculoUncheckedUpdateWithoutMotoristaInputSchema),
    ]),
    create: z.union([
      z.lazy(() => VeiculoCreateWithoutMotoristaInputSchema),
      z.lazy(() => VeiculoUncheckedCreateWithoutMotoristaInputSchema),
    ]),
    where: z.lazy(() => VeiculoWhereInputSchema).optional(),
  });

export const VeiculoUpdateToOneWithWhereWithoutMotoristaInputSchema: z.ZodType<Prisma.VeiculoUpdateToOneWithWhereWithoutMotoristaInput> =
  z.strictObject({
    where: z.lazy(() => VeiculoWhereInputSchema).optional(),
    data: z.union([
      z.lazy(() => VeiculoUpdateWithoutMotoristaInputSchema),
      z.lazy(() => VeiculoUncheckedUpdateWithoutMotoristaInputSchema),
    ]),
  });

export const VeiculoUpdateWithoutMotoristaInputSchema: z.ZodType<Prisma.VeiculoUpdateWithoutMotoristaInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    placa: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    latitude: z
      .union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)])
      .optional(),
    longitude: z
      .union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)])
      .optional(),
    atendimentos: z
      .lazy(() => VeiculoAtendimentoUpdateManyWithoutVeiculoNestedInputSchema)
      .optional(),
  });

export const VeiculoUncheckedUpdateWithoutMotoristaInputSchema: z.ZodType<Prisma.VeiculoUncheckedUpdateWithoutMotoristaInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    placa: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    latitude: z
      .union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)])
      .optional(),
    longitude: z
      .union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)])
      .optional(),
    atendimentos: z
      .lazy(
        () =>
          VeiculoAtendimentoUncheckedUpdateManyWithoutVeiculoNestedInputSchema,
      )
      .optional(),
  });

export const AtendimentoUpsertWithWhereUniqueWithoutAtendenteInputSchema: z.ZodType<Prisma.AtendimentoUpsertWithWhereUniqueWithoutAtendenteInput> =
  z.strictObject({
    where: z.lazy(() => AtendimentoWhereUniqueInputSchema),
    update: z.union([
      z.lazy(() => AtendimentoUpdateWithoutAtendenteInputSchema),
      z.lazy(() => AtendimentoUncheckedUpdateWithoutAtendenteInputSchema),
    ]),
    create: z.union([
      z.lazy(() => AtendimentoCreateWithoutAtendenteInputSchema),
      z.lazy(() => AtendimentoUncheckedCreateWithoutAtendenteInputSchema),
    ]),
  });

export const AtendimentoUpdateWithWhereUniqueWithoutAtendenteInputSchema: z.ZodType<Prisma.AtendimentoUpdateWithWhereUniqueWithoutAtendenteInput> =
  z.strictObject({
    where: z.lazy(() => AtendimentoWhereUniqueInputSchema),
    data: z.union([
      z.lazy(() => AtendimentoUpdateWithoutAtendenteInputSchema),
      z.lazy(() => AtendimentoUncheckedUpdateWithoutAtendenteInputSchema),
    ]),
  });

export const AtendimentoUpdateManyWithWhereWithoutAtendenteInputSchema: z.ZodType<Prisma.AtendimentoUpdateManyWithWhereWithoutAtendenteInput> =
  z.strictObject({
    where: z.lazy(() => AtendimentoScalarWhereInputSchema),
    data: z.union([
      z.lazy(() => AtendimentoUpdateManyMutationInputSchema),
      z.lazy(() => AtendimentoUncheckedUpdateManyWithoutAtendenteInputSchema),
    ]),
  });

export const AtendimentoScalarWhereInputSchema: z.ZodType<Prisma.AtendimentoScalarWhereInput> =
  z.strictObject({
    AND: z
      .union([
        z.lazy(() => AtendimentoScalarWhereInputSchema),
        z.lazy(() => AtendimentoScalarWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => AtendimentoScalarWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => AtendimentoScalarWhereInputSchema),
        z.lazy(() => AtendimentoScalarWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    protocolo: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    endereco: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    localDeRetorno: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    oQueAconteceu: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    estadoDoPaciente: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    idadeAparente: z
      .union([z.lazy(() => IntNullableFilterSchema), z.number()])
      .optional()
      .nullable(),
    quantidadeDePacientes: z
      .union([z.lazy(() => IntFilterSchema), z.number()])
      .optional(),
    estadoDaLesao: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    observacoes: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    atendenteId: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    criadoEm: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
  });

export const ConversaUpsertWithWhereUniqueWithoutAtendenteInputSchema: z.ZodType<Prisma.ConversaUpsertWithWhereUniqueWithoutAtendenteInput> =
  z.strictObject({
    where: z.lazy(() => ConversaWhereUniqueInputSchema),
    update: z.union([
      z.lazy(() => ConversaUpdateWithoutAtendenteInputSchema),
      z.lazy(() => ConversaUncheckedUpdateWithoutAtendenteInputSchema),
    ]),
    create: z.union([
      z.lazy(() => ConversaCreateWithoutAtendenteInputSchema),
      z.lazy(() => ConversaUncheckedCreateWithoutAtendenteInputSchema),
    ]),
  });

export const ConversaUpdateWithWhereUniqueWithoutAtendenteInputSchema: z.ZodType<Prisma.ConversaUpdateWithWhereUniqueWithoutAtendenteInput> =
  z.strictObject({
    where: z.lazy(() => ConversaWhereUniqueInputSchema),
    data: z.union([
      z.lazy(() => ConversaUpdateWithoutAtendenteInputSchema),
      z.lazy(() => ConversaUncheckedUpdateWithoutAtendenteInputSchema),
    ]),
  });

export const ConversaUpdateManyWithWhereWithoutAtendenteInputSchema: z.ZodType<Prisma.ConversaUpdateManyWithWhereWithoutAtendenteInput> =
  z.strictObject({
    where: z.lazy(() => ConversaScalarWhereInputSchema),
    data: z.union([
      z.lazy(() => ConversaUpdateManyMutationInputSchema),
      z.lazy(() => ConversaUncheckedUpdateManyWithoutAtendenteInputSchema),
    ]),
  });

export const ConversaScalarWhereInputSchema: z.ZodType<Prisma.ConversaScalarWhereInput> =
  z.strictObject({
    AND: z
      .union([
        z.lazy(() => ConversaScalarWhereInputSchema),
        z.lazy(() => ConversaScalarWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => ConversaScalarWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => ConversaScalarWhereInputSchema),
        z.lazy(() => ConversaScalarWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    atendenteId: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    motoristaId: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
  });

export const ConversaUpsertWithWhereUniqueWithoutMotoristaInputSchema: z.ZodType<Prisma.ConversaUpsertWithWhereUniqueWithoutMotoristaInput> =
  z.strictObject({
    where: z.lazy(() => ConversaWhereUniqueInputSchema),
    update: z.union([
      z.lazy(() => ConversaUpdateWithoutMotoristaInputSchema),
      z.lazy(() => ConversaUncheckedUpdateWithoutMotoristaInputSchema),
    ]),
    create: z.union([
      z.lazy(() => ConversaCreateWithoutMotoristaInputSchema),
      z.lazy(() => ConversaUncheckedCreateWithoutMotoristaInputSchema),
    ]),
  });

export const ConversaUpdateWithWhereUniqueWithoutMotoristaInputSchema: z.ZodType<Prisma.ConversaUpdateWithWhereUniqueWithoutMotoristaInput> =
  z.strictObject({
    where: z.lazy(() => ConversaWhereUniqueInputSchema),
    data: z.union([
      z.lazy(() => ConversaUpdateWithoutMotoristaInputSchema),
      z.lazy(() => ConversaUncheckedUpdateWithoutMotoristaInputSchema),
    ]),
  });

export const ConversaUpdateManyWithWhereWithoutMotoristaInputSchema: z.ZodType<Prisma.ConversaUpdateManyWithWhereWithoutMotoristaInput> =
  z.strictObject({
    where: z.lazy(() => ConversaScalarWhereInputSchema),
    data: z.union([
      z.lazy(() => ConversaUpdateManyMutationInputSchema),
      z.lazy(() => ConversaUncheckedUpdateManyWithoutMotoristaInputSchema),
    ]),
  });

export const MensagemUpsertWithWhereUniqueWithoutQuemMandouInputSchema: z.ZodType<Prisma.MensagemUpsertWithWhereUniqueWithoutQuemMandouInput> =
  z.strictObject({
    where: z.lazy(() => MensagemWhereUniqueInputSchema),
    update: z.union([
      z.lazy(() => MensagemUpdateWithoutQuemMandouInputSchema),
      z.lazy(() => MensagemUncheckedUpdateWithoutQuemMandouInputSchema),
    ]),
    create: z.union([
      z.lazy(() => MensagemCreateWithoutQuemMandouInputSchema),
      z.lazy(() => MensagemUncheckedCreateWithoutQuemMandouInputSchema),
    ]),
  });

export const MensagemUpdateWithWhereUniqueWithoutQuemMandouInputSchema: z.ZodType<Prisma.MensagemUpdateWithWhereUniqueWithoutQuemMandouInput> =
  z.strictObject({
    where: z.lazy(() => MensagemWhereUniqueInputSchema),
    data: z.union([
      z.lazy(() => MensagemUpdateWithoutQuemMandouInputSchema),
      z.lazy(() => MensagemUncheckedUpdateWithoutQuemMandouInputSchema),
    ]),
  });

export const MensagemUpdateManyWithWhereWithoutQuemMandouInputSchema: z.ZodType<Prisma.MensagemUpdateManyWithWhereWithoutQuemMandouInput> =
  z.strictObject({
    where: z.lazy(() => MensagemScalarWhereInputSchema),
    data: z.union([
      z.lazy(() => MensagemUpdateManyMutationInputSchema),
      z.lazy(() => MensagemUncheckedUpdateManyWithoutQuemMandouInputSchema),
    ]),
  });

export const MensagemScalarWhereInputSchema: z.ZodType<Prisma.MensagemScalarWhereInput> =
  z.strictObject({
    AND: z
      .union([
        z.lazy(() => MensagemScalarWhereInputSchema),
        z.lazy(() => MensagemScalarWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => MensagemScalarWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => MensagemScalarWhereInputSchema),
        z.lazy(() => MensagemScalarWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    texto: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    dataDeEnvio: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    quemMandouId: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    conversaId: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
  });

export const UsuarioCreateWithoutVeiculoInputSchema: z.ZodType<Prisma.UsuarioCreateWithoutVeiculoInput> =
  z.strictObject({
    id: z.uuid().optional(),
    email: z.string(),
    senha: z.string(),
    tipo: z.lazy(() => TipoUsuarioSchema),
    telefone: z.string(),
    status: z.lazy(() => StatusUsuarioSchema).optional(),
    criadoEm: z.coerce.date().optional(),
    atendimentosRegistrados: z
      .lazy(() => AtendimentoCreateNestedManyWithoutAtendenteInputSchema)
      .optional(),
    conversasComoAtendente: z
      .lazy(() => ConversaCreateNestedManyWithoutAtendenteInputSchema)
      .optional(),
    conversasComoMotorista: z
      .lazy(() => ConversaCreateNestedManyWithoutMotoristaInputSchema)
      .optional(),
    mensagensEnviadas: z
      .lazy(() => MensagemCreateNestedManyWithoutQuemMandouInputSchema)
      .optional(),
  });

export const UsuarioUncheckedCreateWithoutVeiculoInputSchema: z.ZodType<Prisma.UsuarioUncheckedCreateWithoutVeiculoInput> =
  z.strictObject({
    id: z.uuid().optional(),
    email: z.string(),
    senha: z.string(),
    tipo: z.lazy(() => TipoUsuarioSchema),
    telefone: z.string(),
    status: z.lazy(() => StatusUsuarioSchema).optional(),
    criadoEm: z.coerce.date().optional(),
    atendimentosRegistrados: z
      .lazy(
        () => AtendimentoUncheckedCreateNestedManyWithoutAtendenteInputSchema,
      )
      .optional(),
    conversasComoAtendente: z
      .lazy(() => ConversaUncheckedCreateNestedManyWithoutAtendenteInputSchema)
      .optional(),
    conversasComoMotorista: z
      .lazy(() => ConversaUncheckedCreateNestedManyWithoutMotoristaInputSchema)
      .optional(),
    mensagensEnviadas: z
      .lazy(() => MensagemUncheckedCreateNestedManyWithoutQuemMandouInputSchema)
      .optional(),
  });

export const UsuarioCreateOrConnectWithoutVeiculoInputSchema: z.ZodType<Prisma.UsuarioCreateOrConnectWithoutVeiculoInput> =
  z.strictObject({
    where: z.lazy(() => UsuarioWhereUniqueInputSchema),
    create: z.union([
      z.lazy(() => UsuarioCreateWithoutVeiculoInputSchema),
      z.lazy(() => UsuarioUncheckedCreateWithoutVeiculoInputSchema),
    ]),
  });

export const VeiculoAtendimentoCreateWithoutVeiculoInputSchema: z.ZodType<Prisma.VeiculoAtendimentoCreateWithoutVeiculoInput> =
  z.strictObject({
    id: z.uuid().optional(),
    status: z.lazy(() => StatusAtendimentoSchema).optional(),
    atendimento: z.lazy(
      () => AtendimentoCreateNestedOneWithoutVeiculosInputSchema,
    ),
  });

export const VeiculoAtendimentoUncheckedCreateWithoutVeiculoInputSchema: z.ZodType<Prisma.VeiculoAtendimentoUncheckedCreateWithoutVeiculoInput> =
  z.strictObject({
    id: z.uuid().optional(),
    status: z.lazy(() => StatusAtendimentoSchema).optional(),
    atendimentoId: z.string(),
  });

export const VeiculoAtendimentoCreateOrConnectWithoutVeiculoInputSchema: z.ZodType<Prisma.VeiculoAtendimentoCreateOrConnectWithoutVeiculoInput> =
  z.strictObject({
    where: z.lazy(() => VeiculoAtendimentoWhereUniqueInputSchema),
    create: z.union([
      z.lazy(() => VeiculoAtendimentoCreateWithoutVeiculoInputSchema),
      z.lazy(() => VeiculoAtendimentoUncheckedCreateWithoutVeiculoInputSchema),
    ]),
  });

export const VeiculoAtendimentoCreateManyVeiculoInputEnvelopeSchema: z.ZodType<Prisma.VeiculoAtendimentoCreateManyVeiculoInputEnvelope> =
  z.strictObject({
    data: z.union([
      z.lazy(() => VeiculoAtendimentoCreateManyVeiculoInputSchema),
      z.lazy(() => VeiculoAtendimentoCreateManyVeiculoInputSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  });

export const UsuarioUpsertWithoutVeiculoInputSchema: z.ZodType<Prisma.UsuarioUpsertWithoutVeiculoInput> =
  z.strictObject({
    update: z.union([
      z.lazy(() => UsuarioUpdateWithoutVeiculoInputSchema),
      z.lazy(() => UsuarioUncheckedUpdateWithoutVeiculoInputSchema),
    ]),
    create: z.union([
      z.lazy(() => UsuarioCreateWithoutVeiculoInputSchema),
      z.lazy(() => UsuarioUncheckedCreateWithoutVeiculoInputSchema),
    ]),
    where: z.lazy(() => UsuarioWhereInputSchema).optional(),
  });

export const UsuarioUpdateToOneWithWhereWithoutVeiculoInputSchema: z.ZodType<Prisma.UsuarioUpdateToOneWithWhereWithoutVeiculoInput> =
  z.strictObject({
    where: z.lazy(() => UsuarioWhereInputSchema).optional(),
    data: z.union([
      z.lazy(() => UsuarioUpdateWithoutVeiculoInputSchema),
      z.lazy(() => UsuarioUncheckedUpdateWithoutVeiculoInputSchema),
    ]),
  });

export const UsuarioUpdateWithoutVeiculoInputSchema: z.ZodType<Prisma.UsuarioUpdateWithoutVeiculoInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    email: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    senha: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    tipo: z
      .union([
        z.lazy(() => TipoUsuarioSchema),
        z.lazy(() => EnumTipoUsuarioFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    telefone: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    status: z
      .union([
        z.lazy(() => StatusUsuarioSchema),
        z.lazy(() => EnumStatusUsuarioFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    criadoEm: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    atendimentosRegistrados: z
      .lazy(() => AtendimentoUpdateManyWithoutAtendenteNestedInputSchema)
      .optional(),
    conversasComoAtendente: z
      .lazy(() => ConversaUpdateManyWithoutAtendenteNestedInputSchema)
      .optional(),
    conversasComoMotorista: z
      .lazy(() => ConversaUpdateManyWithoutMotoristaNestedInputSchema)
      .optional(),
    mensagensEnviadas: z
      .lazy(() => MensagemUpdateManyWithoutQuemMandouNestedInputSchema)
      .optional(),
  });

export const UsuarioUncheckedUpdateWithoutVeiculoInputSchema: z.ZodType<Prisma.UsuarioUncheckedUpdateWithoutVeiculoInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    email: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    senha: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    tipo: z
      .union([
        z.lazy(() => TipoUsuarioSchema),
        z.lazy(() => EnumTipoUsuarioFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    telefone: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    status: z
      .union([
        z.lazy(() => StatusUsuarioSchema),
        z.lazy(() => EnumStatusUsuarioFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    criadoEm: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    atendimentosRegistrados: z
      .lazy(
        () => AtendimentoUncheckedUpdateManyWithoutAtendenteNestedInputSchema,
      )
      .optional(),
    conversasComoAtendente: z
      .lazy(() => ConversaUncheckedUpdateManyWithoutAtendenteNestedInputSchema)
      .optional(),
    conversasComoMotorista: z
      .lazy(() => ConversaUncheckedUpdateManyWithoutMotoristaNestedInputSchema)
      .optional(),
    mensagensEnviadas: z
      .lazy(() => MensagemUncheckedUpdateManyWithoutQuemMandouNestedInputSchema)
      .optional(),
  });

export const VeiculoAtendimentoUpsertWithWhereUniqueWithoutVeiculoInputSchema: z.ZodType<Prisma.VeiculoAtendimentoUpsertWithWhereUniqueWithoutVeiculoInput> =
  z.strictObject({
    where: z.lazy(() => VeiculoAtendimentoWhereUniqueInputSchema),
    update: z.union([
      z.lazy(() => VeiculoAtendimentoUpdateWithoutVeiculoInputSchema),
      z.lazy(() => VeiculoAtendimentoUncheckedUpdateWithoutVeiculoInputSchema),
    ]),
    create: z.union([
      z.lazy(() => VeiculoAtendimentoCreateWithoutVeiculoInputSchema),
      z.lazy(() => VeiculoAtendimentoUncheckedCreateWithoutVeiculoInputSchema),
    ]),
  });

export const VeiculoAtendimentoUpdateWithWhereUniqueWithoutVeiculoInputSchema: z.ZodType<Prisma.VeiculoAtendimentoUpdateWithWhereUniqueWithoutVeiculoInput> =
  z.strictObject({
    where: z.lazy(() => VeiculoAtendimentoWhereUniqueInputSchema),
    data: z.union([
      z.lazy(() => VeiculoAtendimentoUpdateWithoutVeiculoInputSchema),
      z.lazy(() => VeiculoAtendimentoUncheckedUpdateWithoutVeiculoInputSchema),
    ]),
  });

export const VeiculoAtendimentoUpdateManyWithWhereWithoutVeiculoInputSchema: z.ZodType<Prisma.VeiculoAtendimentoUpdateManyWithWhereWithoutVeiculoInput> =
  z.strictObject({
    where: z.lazy(() => VeiculoAtendimentoScalarWhereInputSchema),
    data: z.union([
      z.lazy(() => VeiculoAtendimentoUpdateManyMutationInputSchema),
      z.lazy(
        () => VeiculoAtendimentoUncheckedUpdateManyWithoutVeiculoInputSchema,
      ),
    ]),
  });

export const VeiculoAtendimentoScalarWhereInputSchema: z.ZodType<Prisma.VeiculoAtendimentoScalarWhereInput> =
  z.strictObject({
    AND: z
      .union([
        z.lazy(() => VeiculoAtendimentoScalarWhereInputSchema),
        z.lazy(() => VeiculoAtendimentoScalarWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => VeiculoAtendimentoScalarWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => VeiculoAtendimentoScalarWhereInputSchema),
        z.lazy(() => VeiculoAtendimentoScalarWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    status: z
      .union([
        z.lazy(() => EnumStatusAtendimentoFilterSchema),
        z.lazy(() => StatusAtendimentoSchema),
      ])
      .optional(),
    veiculoId: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    atendimentoId: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
  });

export const UsuarioCreateWithoutAtendimentosRegistradosInputSchema: z.ZodType<Prisma.UsuarioCreateWithoutAtendimentosRegistradosInput> =
  z.strictObject({
    id: z.uuid().optional(),
    email: z.string(),
    senha: z.string(),
    tipo: z.lazy(() => TipoUsuarioSchema),
    telefone: z.string(),
    status: z.lazy(() => StatusUsuarioSchema).optional(),
    criadoEm: z.coerce.date().optional(),
    veiculo: z
      .lazy(() => VeiculoCreateNestedOneWithoutMotoristaInputSchema)
      .optional(),
    conversasComoAtendente: z
      .lazy(() => ConversaCreateNestedManyWithoutAtendenteInputSchema)
      .optional(),
    conversasComoMotorista: z
      .lazy(() => ConversaCreateNestedManyWithoutMotoristaInputSchema)
      .optional(),
    mensagensEnviadas: z
      .lazy(() => MensagemCreateNestedManyWithoutQuemMandouInputSchema)
      .optional(),
  });

export const UsuarioUncheckedCreateWithoutAtendimentosRegistradosInputSchema: z.ZodType<Prisma.UsuarioUncheckedCreateWithoutAtendimentosRegistradosInput> =
  z.strictObject({
    id: z.uuid().optional(),
    email: z.string(),
    senha: z.string(),
    tipo: z.lazy(() => TipoUsuarioSchema),
    telefone: z.string(),
    status: z.lazy(() => StatusUsuarioSchema).optional(),
    criadoEm: z.coerce.date().optional(),
    veiculo: z
      .lazy(() => VeiculoUncheckedCreateNestedOneWithoutMotoristaInputSchema)
      .optional(),
    conversasComoAtendente: z
      .lazy(() => ConversaUncheckedCreateNestedManyWithoutAtendenteInputSchema)
      .optional(),
    conversasComoMotorista: z
      .lazy(() => ConversaUncheckedCreateNestedManyWithoutMotoristaInputSchema)
      .optional(),
    mensagensEnviadas: z
      .lazy(() => MensagemUncheckedCreateNestedManyWithoutQuemMandouInputSchema)
      .optional(),
  });

export const UsuarioCreateOrConnectWithoutAtendimentosRegistradosInputSchema: z.ZodType<Prisma.UsuarioCreateOrConnectWithoutAtendimentosRegistradosInput> =
  z.strictObject({
    where: z.lazy(() => UsuarioWhereUniqueInputSchema),
    create: z.union([
      z.lazy(() => UsuarioCreateWithoutAtendimentosRegistradosInputSchema),
      z.lazy(
        () => UsuarioUncheckedCreateWithoutAtendimentosRegistradosInputSchema,
      ),
    ]),
  });

export const VeiculoAtendimentoCreateWithoutAtendimentoInputSchema: z.ZodType<Prisma.VeiculoAtendimentoCreateWithoutAtendimentoInput> =
  z.strictObject({
    id: z.uuid().optional(),
    status: z.lazy(() => StatusAtendimentoSchema).optional(),
    veiculo: z.lazy(() => VeiculoCreateNestedOneWithoutAtendimentosInputSchema),
  });

export const VeiculoAtendimentoUncheckedCreateWithoutAtendimentoInputSchema: z.ZodType<Prisma.VeiculoAtendimentoUncheckedCreateWithoutAtendimentoInput> =
  z.strictObject({
    id: z.uuid().optional(),
    status: z.lazy(() => StatusAtendimentoSchema).optional(),
    veiculoId: z.string(),
  });

export const VeiculoAtendimentoCreateOrConnectWithoutAtendimentoInputSchema: z.ZodType<Prisma.VeiculoAtendimentoCreateOrConnectWithoutAtendimentoInput> =
  z.strictObject({
    where: z.lazy(() => VeiculoAtendimentoWhereUniqueInputSchema),
    create: z.union([
      z.lazy(() => VeiculoAtendimentoCreateWithoutAtendimentoInputSchema),
      z.lazy(
        () => VeiculoAtendimentoUncheckedCreateWithoutAtendimentoInputSchema,
      ),
    ]),
  });

export const VeiculoAtendimentoCreateManyAtendimentoInputEnvelopeSchema: z.ZodType<Prisma.VeiculoAtendimentoCreateManyAtendimentoInputEnvelope> =
  z.strictObject({
    data: z.union([
      z.lazy(() => VeiculoAtendimentoCreateManyAtendimentoInputSchema),
      z.lazy(() => VeiculoAtendimentoCreateManyAtendimentoInputSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  });

export const NotificacaoCreateWithoutAtendimentoInputSchema: z.ZodType<Prisma.NotificacaoCreateWithoutAtendimentoInput> =
  z.strictObject({
    id: z.uuid().optional(),
    mensagem: z.string(),
    dataDaNotificacao: z.coerce.date().optional(),
  });

export const NotificacaoUncheckedCreateWithoutAtendimentoInputSchema: z.ZodType<Prisma.NotificacaoUncheckedCreateWithoutAtendimentoInput> =
  z.strictObject({
    id: z.uuid().optional(),
    mensagem: z.string(),
    dataDaNotificacao: z.coerce.date().optional(),
  });

export const NotificacaoCreateOrConnectWithoutAtendimentoInputSchema: z.ZodType<Prisma.NotificacaoCreateOrConnectWithoutAtendimentoInput> =
  z.strictObject({
    where: z.lazy(() => NotificacaoWhereUniqueInputSchema),
    create: z.union([
      z.lazy(() => NotificacaoCreateWithoutAtendimentoInputSchema),
      z.lazy(() => NotificacaoUncheckedCreateWithoutAtendimentoInputSchema),
    ]),
  });

export const NotificacaoCreateManyAtendimentoInputEnvelopeSchema: z.ZodType<Prisma.NotificacaoCreateManyAtendimentoInputEnvelope> =
  z.strictObject({
    data: z.union([
      z.lazy(() => NotificacaoCreateManyAtendimentoInputSchema),
      z.lazy(() => NotificacaoCreateManyAtendimentoInputSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  });

export const UsuarioUpsertWithoutAtendimentosRegistradosInputSchema: z.ZodType<Prisma.UsuarioUpsertWithoutAtendimentosRegistradosInput> =
  z.strictObject({
    update: z.union([
      z.lazy(() => UsuarioUpdateWithoutAtendimentosRegistradosInputSchema),
      z.lazy(
        () => UsuarioUncheckedUpdateWithoutAtendimentosRegistradosInputSchema,
      ),
    ]),
    create: z.union([
      z.lazy(() => UsuarioCreateWithoutAtendimentosRegistradosInputSchema),
      z.lazy(
        () => UsuarioUncheckedCreateWithoutAtendimentosRegistradosInputSchema,
      ),
    ]),
    where: z.lazy(() => UsuarioWhereInputSchema).optional(),
  });

export const UsuarioUpdateToOneWithWhereWithoutAtendimentosRegistradosInputSchema: z.ZodType<Prisma.UsuarioUpdateToOneWithWhereWithoutAtendimentosRegistradosInput> =
  z.strictObject({
    where: z.lazy(() => UsuarioWhereInputSchema).optional(),
    data: z.union([
      z.lazy(() => UsuarioUpdateWithoutAtendimentosRegistradosInputSchema),
      z.lazy(
        () => UsuarioUncheckedUpdateWithoutAtendimentosRegistradosInputSchema,
      ),
    ]),
  });

export const UsuarioUpdateWithoutAtendimentosRegistradosInputSchema: z.ZodType<Prisma.UsuarioUpdateWithoutAtendimentosRegistradosInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    email: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    senha: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    tipo: z
      .union([
        z.lazy(() => TipoUsuarioSchema),
        z.lazy(() => EnumTipoUsuarioFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    telefone: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    status: z
      .union([
        z.lazy(() => StatusUsuarioSchema),
        z.lazy(() => EnumStatusUsuarioFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    criadoEm: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    veiculo: z
      .lazy(() => VeiculoUpdateOneWithoutMotoristaNestedInputSchema)
      .optional(),
    conversasComoAtendente: z
      .lazy(() => ConversaUpdateManyWithoutAtendenteNestedInputSchema)
      .optional(),
    conversasComoMotorista: z
      .lazy(() => ConversaUpdateManyWithoutMotoristaNestedInputSchema)
      .optional(),
    mensagensEnviadas: z
      .lazy(() => MensagemUpdateManyWithoutQuemMandouNestedInputSchema)
      .optional(),
  });

export const UsuarioUncheckedUpdateWithoutAtendimentosRegistradosInputSchema: z.ZodType<Prisma.UsuarioUncheckedUpdateWithoutAtendimentosRegistradosInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    email: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    senha: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    tipo: z
      .union([
        z.lazy(() => TipoUsuarioSchema),
        z.lazy(() => EnumTipoUsuarioFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    telefone: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    status: z
      .union([
        z.lazy(() => StatusUsuarioSchema),
        z.lazy(() => EnumStatusUsuarioFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    criadoEm: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    veiculo: z
      .lazy(() => VeiculoUncheckedUpdateOneWithoutMotoristaNestedInputSchema)
      .optional(),
    conversasComoAtendente: z
      .lazy(() => ConversaUncheckedUpdateManyWithoutAtendenteNestedInputSchema)
      .optional(),
    conversasComoMotorista: z
      .lazy(() => ConversaUncheckedUpdateManyWithoutMotoristaNestedInputSchema)
      .optional(),
    mensagensEnviadas: z
      .lazy(() => MensagemUncheckedUpdateManyWithoutQuemMandouNestedInputSchema)
      .optional(),
  });

export const VeiculoAtendimentoUpsertWithWhereUniqueWithoutAtendimentoInputSchema: z.ZodType<Prisma.VeiculoAtendimentoUpsertWithWhereUniqueWithoutAtendimentoInput> =
  z.strictObject({
    where: z.lazy(() => VeiculoAtendimentoWhereUniqueInputSchema),
    update: z.union([
      z.lazy(() => VeiculoAtendimentoUpdateWithoutAtendimentoInputSchema),
      z.lazy(
        () => VeiculoAtendimentoUncheckedUpdateWithoutAtendimentoInputSchema,
      ),
    ]),
    create: z.union([
      z.lazy(() => VeiculoAtendimentoCreateWithoutAtendimentoInputSchema),
      z.lazy(
        () => VeiculoAtendimentoUncheckedCreateWithoutAtendimentoInputSchema,
      ),
    ]),
  });

export const VeiculoAtendimentoUpdateWithWhereUniqueWithoutAtendimentoInputSchema: z.ZodType<Prisma.VeiculoAtendimentoUpdateWithWhereUniqueWithoutAtendimentoInput> =
  z.strictObject({
    where: z.lazy(() => VeiculoAtendimentoWhereUniqueInputSchema),
    data: z.union([
      z.lazy(() => VeiculoAtendimentoUpdateWithoutAtendimentoInputSchema),
      z.lazy(
        () => VeiculoAtendimentoUncheckedUpdateWithoutAtendimentoInputSchema,
      ),
    ]),
  });

export const VeiculoAtendimentoUpdateManyWithWhereWithoutAtendimentoInputSchema: z.ZodType<Prisma.VeiculoAtendimentoUpdateManyWithWhereWithoutAtendimentoInput> =
  z.strictObject({
    where: z.lazy(() => VeiculoAtendimentoScalarWhereInputSchema),
    data: z.union([
      z.lazy(() => VeiculoAtendimentoUpdateManyMutationInputSchema),
      z.lazy(
        () =>
          VeiculoAtendimentoUncheckedUpdateManyWithoutAtendimentoInputSchema,
      ),
    ]),
  });

export const NotificacaoUpsertWithWhereUniqueWithoutAtendimentoInputSchema: z.ZodType<Prisma.NotificacaoUpsertWithWhereUniqueWithoutAtendimentoInput> =
  z.strictObject({
    where: z.lazy(() => NotificacaoWhereUniqueInputSchema),
    update: z.union([
      z.lazy(() => NotificacaoUpdateWithoutAtendimentoInputSchema),
      z.lazy(() => NotificacaoUncheckedUpdateWithoutAtendimentoInputSchema),
    ]),
    create: z.union([
      z.lazy(() => NotificacaoCreateWithoutAtendimentoInputSchema),
      z.lazy(() => NotificacaoUncheckedCreateWithoutAtendimentoInputSchema),
    ]),
  });

export const NotificacaoUpdateWithWhereUniqueWithoutAtendimentoInputSchema: z.ZodType<Prisma.NotificacaoUpdateWithWhereUniqueWithoutAtendimentoInput> =
  z.strictObject({
    where: z.lazy(() => NotificacaoWhereUniqueInputSchema),
    data: z.union([
      z.lazy(() => NotificacaoUpdateWithoutAtendimentoInputSchema),
      z.lazy(() => NotificacaoUncheckedUpdateWithoutAtendimentoInputSchema),
    ]),
  });

export const NotificacaoUpdateManyWithWhereWithoutAtendimentoInputSchema: z.ZodType<Prisma.NotificacaoUpdateManyWithWhereWithoutAtendimentoInput> =
  z.strictObject({
    where: z.lazy(() => NotificacaoScalarWhereInputSchema),
    data: z.union([
      z.lazy(() => NotificacaoUpdateManyMutationInputSchema),
      z.lazy(() => NotificacaoUncheckedUpdateManyWithoutAtendimentoInputSchema),
    ]),
  });

export const NotificacaoScalarWhereInputSchema: z.ZodType<Prisma.NotificacaoScalarWhereInput> =
  z.strictObject({
    AND: z
      .union([
        z.lazy(() => NotificacaoScalarWhereInputSchema),
        z.lazy(() => NotificacaoScalarWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => NotificacaoScalarWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => NotificacaoScalarWhereInputSchema),
        z.lazy(() => NotificacaoScalarWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    mensagem: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    dataDaNotificacao: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    atendimentoId: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
  });

export const VeiculoCreateWithoutAtendimentosInputSchema: z.ZodType<Prisma.VeiculoCreateWithoutAtendimentosInput> =
  z.strictObject({
    id: z.uuid().optional(),
    placa: z.string(),
    latitude: z.number(),
    longitude: z.number(),
    motorista: z.lazy(() => UsuarioCreateNestedOneWithoutVeiculoInputSchema),
  });

export const VeiculoUncheckedCreateWithoutAtendimentosInputSchema: z.ZodType<Prisma.VeiculoUncheckedCreateWithoutAtendimentosInput> =
  z.strictObject({
    id: z.uuid().optional(),
    placa: z.string(),
    latitude: z.number(),
    longitude: z.number(),
    motoristaId: z.string(),
  });

export const VeiculoCreateOrConnectWithoutAtendimentosInputSchema: z.ZodType<Prisma.VeiculoCreateOrConnectWithoutAtendimentosInput> =
  z.strictObject({
    where: z.lazy(() => VeiculoWhereUniqueInputSchema),
    create: z.union([
      z.lazy(() => VeiculoCreateWithoutAtendimentosInputSchema),
      z.lazy(() => VeiculoUncheckedCreateWithoutAtendimentosInputSchema),
    ]),
  });

export const AtendimentoCreateWithoutVeiculosInputSchema: z.ZodType<Prisma.AtendimentoCreateWithoutVeiculosInput> =
  z.strictObject({
    id: z.uuid().optional(),
    protocolo: z.string(),
    endereco: z.string(),
    localDeRetorno: z.string(),
    oQueAconteceu: z.string(),
    estadoDoPaciente: z.string(),
    idadeAparente: z.number().int().optional().nullable(),
    quantidadeDePacientes: z.number().int(),
    estadoDaLesao: z.string(),
    observacoes: z.string().optional().nullable(),
    criadoEm: z.coerce.date().optional(),
    atendente: z.lazy(
      () => UsuarioCreateNestedOneWithoutAtendimentosRegistradosInputSchema,
    ),
    notificacoes: z
      .lazy(() => NotificacaoCreateNestedManyWithoutAtendimentoInputSchema)
      .optional(),
  });

export const AtendimentoUncheckedCreateWithoutVeiculosInputSchema: z.ZodType<Prisma.AtendimentoUncheckedCreateWithoutVeiculosInput> =
  z.strictObject({
    id: z.uuid().optional(),
    protocolo: z.string(),
    endereco: z.string(),
    localDeRetorno: z.string(),
    oQueAconteceu: z.string(),
    estadoDoPaciente: z.string(),
    idadeAparente: z.number().int().optional().nullable(),
    quantidadeDePacientes: z.number().int(),
    estadoDaLesao: z.string(),
    observacoes: z.string().optional().nullable(),
    atendenteId: z.string(),
    criadoEm: z.coerce.date().optional(),
    notificacoes: z
      .lazy(
        () => NotificacaoUncheckedCreateNestedManyWithoutAtendimentoInputSchema,
      )
      .optional(),
  });

export const AtendimentoCreateOrConnectWithoutVeiculosInputSchema: z.ZodType<Prisma.AtendimentoCreateOrConnectWithoutVeiculosInput> =
  z.strictObject({
    where: z.lazy(() => AtendimentoWhereUniqueInputSchema),
    create: z.union([
      z.lazy(() => AtendimentoCreateWithoutVeiculosInputSchema),
      z.lazy(() => AtendimentoUncheckedCreateWithoutVeiculosInputSchema),
    ]),
  });

export const VeiculoUpsertWithoutAtendimentosInputSchema: z.ZodType<Prisma.VeiculoUpsertWithoutAtendimentosInput> =
  z.strictObject({
    update: z.union([
      z.lazy(() => VeiculoUpdateWithoutAtendimentosInputSchema),
      z.lazy(() => VeiculoUncheckedUpdateWithoutAtendimentosInputSchema),
    ]),
    create: z.union([
      z.lazy(() => VeiculoCreateWithoutAtendimentosInputSchema),
      z.lazy(() => VeiculoUncheckedCreateWithoutAtendimentosInputSchema),
    ]),
    where: z.lazy(() => VeiculoWhereInputSchema).optional(),
  });

export const VeiculoUpdateToOneWithWhereWithoutAtendimentosInputSchema: z.ZodType<Prisma.VeiculoUpdateToOneWithWhereWithoutAtendimentosInput> =
  z.strictObject({
    where: z.lazy(() => VeiculoWhereInputSchema).optional(),
    data: z.union([
      z.lazy(() => VeiculoUpdateWithoutAtendimentosInputSchema),
      z.lazy(() => VeiculoUncheckedUpdateWithoutAtendimentosInputSchema),
    ]),
  });

export const VeiculoUpdateWithoutAtendimentosInputSchema: z.ZodType<Prisma.VeiculoUpdateWithoutAtendimentosInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    placa: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    latitude: z
      .union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)])
      .optional(),
    longitude: z
      .union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)])
      .optional(),
    motorista: z
      .lazy(() => UsuarioUpdateOneRequiredWithoutVeiculoNestedInputSchema)
      .optional(),
  });

export const VeiculoUncheckedUpdateWithoutAtendimentosInputSchema: z.ZodType<Prisma.VeiculoUncheckedUpdateWithoutAtendimentosInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    placa: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    latitude: z
      .union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)])
      .optional(),
    longitude: z
      .union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)])
      .optional(),
    motoristaId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
  });

export const AtendimentoUpsertWithoutVeiculosInputSchema: z.ZodType<Prisma.AtendimentoUpsertWithoutVeiculosInput> =
  z.strictObject({
    update: z.union([
      z.lazy(() => AtendimentoUpdateWithoutVeiculosInputSchema),
      z.lazy(() => AtendimentoUncheckedUpdateWithoutVeiculosInputSchema),
    ]),
    create: z.union([
      z.lazy(() => AtendimentoCreateWithoutVeiculosInputSchema),
      z.lazy(() => AtendimentoUncheckedCreateWithoutVeiculosInputSchema),
    ]),
    where: z.lazy(() => AtendimentoWhereInputSchema).optional(),
  });

export const AtendimentoUpdateToOneWithWhereWithoutVeiculosInputSchema: z.ZodType<Prisma.AtendimentoUpdateToOneWithWhereWithoutVeiculosInput> =
  z.strictObject({
    where: z.lazy(() => AtendimentoWhereInputSchema).optional(),
    data: z.union([
      z.lazy(() => AtendimentoUpdateWithoutVeiculosInputSchema),
      z.lazy(() => AtendimentoUncheckedUpdateWithoutVeiculosInputSchema),
    ]),
  });

export const AtendimentoUpdateWithoutVeiculosInputSchema: z.ZodType<Prisma.AtendimentoUpdateWithoutVeiculosInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    protocolo: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    endereco: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    localDeRetorno: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    oQueAconteceu: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    estadoDoPaciente: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    idadeAparente: z
      .union([
        z.number().int(),
        z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    quantidadeDePacientes: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    estadoDaLesao: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    observacoes: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    criadoEm: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    atendente: z
      .lazy(
        () =>
          UsuarioUpdateOneRequiredWithoutAtendimentosRegistradosNestedInputSchema,
      )
      .optional(),
    notificacoes: z
      .lazy(() => NotificacaoUpdateManyWithoutAtendimentoNestedInputSchema)
      .optional(),
  });

export const AtendimentoUncheckedUpdateWithoutVeiculosInputSchema: z.ZodType<Prisma.AtendimentoUncheckedUpdateWithoutVeiculosInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    protocolo: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    endereco: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    localDeRetorno: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    oQueAconteceu: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    estadoDoPaciente: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    idadeAparente: z
      .union([
        z.number().int(),
        z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    quantidadeDePacientes: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    estadoDaLesao: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    observacoes: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    atendenteId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    criadoEm: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    notificacoes: z
      .lazy(
        () => NotificacaoUncheckedUpdateManyWithoutAtendimentoNestedInputSchema,
      )
      .optional(),
  });

export const UsuarioCreateWithoutConversasComoAtendenteInputSchema: z.ZodType<Prisma.UsuarioCreateWithoutConversasComoAtendenteInput> =
  z.strictObject({
    id: z.uuid().optional(),
    email: z.string(),
    senha: z.string(),
    tipo: z.lazy(() => TipoUsuarioSchema),
    telefone: z.string(),
    status: z.lazy(() => StatusUsuarioSchema).optional(),
    criadoEm: z.coerce.date().optional(),
    veiculo: z
      .lazy(() => VeiculoCreateNestedOneWithoutMotoristaInputSchema)
      .optional(),
    atendimentosRegistrados: z
      .lazy(() => AtendimentoCreateNestedManyWithoutAtendenteInputSchema)
      .optional(),
    conversasComoMotorista: z
      .lazy(() => ConversaCreateNestedManyWithoutMotoristaInputSchema)
      .optional(),
    mensagensEnviadas: z
      .lazy(() => MensagemCreateNestedManyWithoutQuemMandouInputSchema)
      .optional(),
  });

export const UsuarioUncheckedCreateWithoutConversasComoAtendenteInputSchema: z.ZodType<Prisma.UsuarioUncheckedCreateWithoutConversasComoAtendenteInput> =
  z.strictObject({
    id: z.uuid().optional(),
    email: z.string(),
    senha: z.string(),
    tipo: z.lazy(() => TipoUsuarioSchema),
    telefone: z.string(),
    status: z.lazy(() => StatusUsuarioSchema).optional(),
    criadoEm: z.coerce.date().optional(),
    veiculo: z
      .lazy(() => VeiculoUncheckedCreateNestedOneWithoutMotoristaInputSchema)
      .optional(),
    atendimentosRegistrados: z
      .lazy(
        () => AtendimentoUncheckedCreateNestedManyWithoutAtendenteInputSchema,
      )
      .optional(),
    conversasComoMotorista: z
      .lazy(() => ConversaUncheckedCreateNestedManyWithoutMotoristaInputSchema)
      .optional(),
    mensagensEnviadas: z
      .lazy(() => MensagemUncheckedCreateNestedManyWithoutQuemMandouInputSchema)
      .optional(),
  });

export const UsuarioCreateOrConnectWithoutConversasComoAtendenteInputSchema: z.ZodType<Prisma.UsuarioCreateOrConnectWithoutConversasComoAtendenteInput> =
  z.strictObject({
    where: z.lazy(() => UsuarioWhereUniqueInputSchema),
    create: z.union([
      z.lazy(() => UsuarioCreateWithoutConversasComoAtendenteInputSchema),
      z.lazy(
        () => UsuarioUncheckedCreateWithoutConversasComoAtendenteInputSchema,
      ),
    ]),
  });

export const UsuarioCreateWithoutConversasComoMotoristaInputSchema: z.ZodType<Prisma.UsuarioCreateWithoutConversasComoMotoristaInput> =
  z.strictObject({
    id: z.uuid().optional(),
    email: z.string(),
    senha: z.string(),
    tipo: z.lazy(() => TipoUsuarioSchema),
    telefone: z.string(),
    status: z.lazy(() => StatusUsuarioSchema).optional(),
    criadoEm: z.coerce.date().optional(),
    veiculo: z
      .lazy(() => VeiculoCreateNestedOneWithoutMotoristaInputSchema)
      .optional(),
    atendimentosRegistrados: z
      .lazy(() => AtendimentoCreateNestedManyWithoutAtendenteInputSchema)
      .optional(),
    conversasComoAtendente: z
      .lazy(() => ConversaCreateNestedManyWithoutAtendenteInputSchema)
      .optional(),
    mensagensEnviadas: z
      .lazy(() => MensagemCreateNestedManyWithoutQuemMandouInputSchema)
      .optional(),
  });

export const UsuarioUncheckedCreateWithoutConversasComoMotoristaInputSchema: z.ZodType<Prisma.UsuarioUncheckedCreateWithoutConversasComoMotoristaInput> =
  z.strictObject({
    id: z.uuid().optional(),
    email: z.string(),
    senha: z.string(),
    tipo: z.lazy(() => TipoUsuarioSchema),
    telefone: z.string(),
    status: z.lazy(() => StatusUsuarioSchema).optional(),
    criadoEm: z.coerce.date().optional(),
    veiculo: z
      .lazy(() => VeiculoUncheckedCreateNestedOneWithoutMotoristaInputSchema)
      .optional(),
    atendimentosRegistrados: z
      .lazy(
        () => AtendimentoUncheckedCreateNestedManyWithoutAtendenteInputSchema,
      )
      .optional(),
    conversasComoAtendente: z
      .lazy(() => ConversaUncheckedCreateNestedManyWithoutAtendenteInputSchema)
      .optional(),
    mensagensEnviadas: z
      .lazy(() => MensagemUncheckedCreateNestedManyWithoutQuemMandouInputSchema)
      .optional(),
  });

export const UsuarioCreateOrConnectWithoutConversasComoMotoristaInputSchema: z.ZodType<Prisma.UsuarioCreateOrConnectWithoutConversasComoMotoristaInput> =
  z.strictObject({
    where: z.lazy(() => UsuarioWhereUniqueInputSchema),
    create: z.union([
      z.lazy(() => UsuarioCreateWithoutConversasComoMotoristaInputSchema),
      z.lazy(
        () => UsuarioUncheckedCreateWithoutConversasComoMotoristaInputSchema,
      ),
    ]),
  });

export const MensagemCreateWithoutConversaInputSchema: z.ZodType<Prisma.MensagemCreateWithoutConversaInput> =
  z.strictObject({
    id: z.uuid().optional(),
    texto: z.string(),
    dataDeEnvio: z.coerce.date().optional(),
    quemMandou: z.lazy(
      () => UsuarioCreateNestedOneWithoutMensagensEnviadasInputSchema,
    ),
  });

export const MensagemUncheckedCreateWithoutConversaInputSchema: z.ZodType<Prisma.MensagemUncheckedCreateWithoutConversaInput> =
  z.strictObject({
    id: z.uuid().optional(),
    texto: z.string(),
    dataDeEnvio: z.coerce.date().optional(),
    quemMandouId: z.string(),
  });

export const MensagemCreateOrConnectWithoutConversaInputSchema: z.ZodType<Prisma.MensagemCreateOrConnectWithoutConversaInput> =
  z.strictObject({
    where: z.lazy(() => MensagemWhereUniqueInputSchema),
    create: z.union([
      z.lazy(() => MensagemCreateWithoutConversaInputSchema),
      z.lazy(() => MensagemUncheckedCreateWithoutConversaInputSchema),
    ]),
  });

export const MensagemCreateManyConversaInputEnvelopeSchema: z.ZodType<Prisma.MensagemCreateManyConversaInputEnvelope> =
  z.strictObject({
    data: z.union([
      z.lazy(() => MensagemCreateManyConversaInputSchema),
      z.lazy(() => MensagemCreateManyConversaInputSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  });

export const UsuarioUpsertWithoutConversasComoAtendenteInputSchema: z.ZodType<Prisma.UsuarioUpsertWithoutConversasComoAtendenteInput> =
  z.strictObject({
    update: z.union([
      z.lazy(() => UsuarioUpdateWithoutConversasComoAtendenteInputSchema),
      z.lazy(
        () => UsuarioUncheckedUpdateWithoutConversasComoAtendenteInputSchema,
      ),
    ]),
    create: z.union([
      z.lazy(() => UsuarioCreateWithoutConversasComoAtendenteInputSchema),
      z.lazy(
        () => UsuarioUncheckedCreateWithoutConversasComoAtendenteInputSchema,
      ),
    ]),
    where: z.lazy(() => UsuarioWhereInputSchema).optional(),
  });

export const UsuarioUpdateToOneWithWhereWithoutConversasComoAtendenteInputSchema: z.ZodType<Prisma.UsuarioUpdateToOneWithWhereWithoutConversasComoAtendenteInput> =
  z.strictObject({
    where: z.lazy(() => UsuarioWhereInputSchema).optional(),
    data: z.union([
      z.lazy(() => UsuarioUpdateWithoutConversasComoAtendenteInputSchema),
      z.lazy(
        () => UsuarioUncheckedUpdateWithoutConversasComoAtendenteInputSchema,
      ),
    ]),
  });

export const UsuarioUpdateWithoutConversasComoAtendenteInputSchema: z.ZodType<Prisma.UsuarioUpdateWithoutConversasComoAtendenteInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    email: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    senha: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    tipo: z
      .union([
        z.lazy(() => TipoUsuarioSchema),
        z.lazy(() => EnumTipoUsuarioFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    telefone: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    status: z
      .union([
        z.lazy(() => StatusUsuarioSchema),
        z.lazy(() => EnumStatusUsuarioFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    criadoEm: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    veiculo: z
      .lazy(() => VeiculoUpdateOneWithoutMotoristaNestedInputSchema)
      .optional(),
    atendimentosRegistrados: z
      .lazy(() => AtendimentoUpdateManyWithoutAtendenteNestedInputSchema)
      .optional(),
    conversasComoMotorista: z
      .lazy(() => ConversaUpdateManyWithoutMotoristaNestedInputSchema)
      .optional(),
    mensagensEnviadas: z
      .lazy(() => MensagemUpdateManyWithoutQuemMandouNestedInputSchema)
      .optional(),
  });

export const UsuarioUncheckedUpdateWithoutConversasComoAtendenteInputSchema: z.ZodType<Prisma.UsuarioUncheckedUpdateWithoutConversasComoAtendenteInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    email: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    senha: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    tipo: z
      .union([
        z.lazy(() => TipoUsuarioSchema),
        z.lazy(() => EnumTipoUsuarioFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    telefone: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    status: z
      .union([
        z.lazy(() => StatusUsuarioSchema),
        z.lazy(() => EnumStatusUsuarioFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    criadoEm: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    veiculo: z
      .lazy(() => VeiculoUncheckedUpdateOneWithoutMotoristaNestedInputSchema)
      .optional(),
    atendimentosRegistrados: z
      .lazy(
        () => AtendimentoUncheckedUpdateManyWithoutAtendenteNestedInputSchema,
      )
      .optional(),
    conversasComoMotorista: z
      .lazy(() => ConversaUncheckedUpdateManyWithoutMotoristaNestedInputSchema)
      .optional(),
    mensagensEnviadas: z
      .lazy(() => MensagemUncheckedUpdateManyWithoutQuemMandouNestedInputSchema)
      .optional(),
  });

export const UsuarioUpsertWithoutConversasComoMotoristaInputSchema: z.ZodType<Prisma.UsuarioUpsertWithoutConversasComoMotoristaInput> =
  z.strictObject({
    update: z.union([
      z.lazy(() => UsuarioUpdateWithoutConversasComoMotoristaInputSchema),
      z.lazy(
        () => UsuarioUncheckedUpdateWithoutConversasComoMotoristaInputSchema,
      ),
    ]),
    create: z.union([
      z.lazy(() => UsuarioCreateWithoutConversasComoMotoristaInputSchema),
      z.lazy(
        () => UsuarioUncheckedCreateWithoutConversasComoMotoristaInputSchema,
      ),
    ]),
    where: z.lazy(() => UsuarioWhereInputSchema).optional(),
  });

export const UsuarioUpdateToOneWithWhereWithoutConversasComoMotoristaInputSchema: z.ZodType<Prisma.UsuarioUpdateToOneWithWhereWithoutConversasComoMotoristaInput> =
  z.strictObject({
    where: z.lazy(() => UsuarioWhereInputSchema).optional(),
    data: z.union([
      z.lazy(() => UsuarioUpdateWithoutConversasComoMotoristaInputSchema),
      z.lazy(
        () => UsuarioUncheckedUpdateWithoutConversasComoMotoristaInputSchema,
      ),
    ]),
  });

export const UsuarioUpdateWithoutConversasComoMotoristaInputSchema: z.ZodType<Prisma.UsuarioUpdateWithoutConversasComoMotoristaInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    email: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    senha: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    tipo: z
      .union([
        z.lazy(() => TipoUsuarioSchema),
        z.lazy(() => EnumTipoUsuarioFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    telefone: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    status: z
      .union([
        z.lazy(() => StatusUsuarioSchema),
        z.lazy(() => EnumStatusUsuarioFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    criadoEm: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    veiculo: z
      .lazy(() => VeiculoUpdateOneWithoutMotoristaNestedInputSchema)
      .optional(),
    atendimentosRegistrados: z
      .lazy(() => AtendimentoUpdateManyWithoutAtendenteNestedInputSchema)
      .optional(),
    conversasComoAtendente: z
      .lazy(() => ConversaUpdateManyWithoutAtendenteNestedInputSchema)
      .optional(),
    mensagensEnviadas: z
      .lazy(() => MensagemUpdateManyWithoutQuemMandouNestedInputSchema)
      .optional(),
  });

export const UsuarioUncheckedUpdateWithoutConversasComoMotoristaInputSchema: z.ZodType<Prisma.UsuarioUncheckedUpdateWithoutConversasComoMotoristaInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    email: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    senha: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    tipo: z
      .union([
        z.lazy(() => TipoUsuarioSchema),
        z.lazy(() => EnumTipoUsuarioFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    telefone: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    status: z
      .union([
        z.lazy(() => StatusUsuarioSchema),
        z.lazy(() => EnumStatusUsuarioFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    criadoEm: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    veiculo: z
      .lazy(() => VeiculoUncheckedUpdateOneWithoutMotoristaNestedInputSchema)
      .optional(),
    atendimentosRegistrados: z
      .lazy(
        () => AtendimentoUncheckedUpdateManyWithoutAtendenteNestedInputSchema,
      )
      .optional(),
    conversasComoAtendente: z
      .lazy(() => ConversaUncheckedUpdateManyWithoutAtendenteNestedInputSchema)
      .optional(),
    mensagensEnviadas: z
      .lazy(() => MensagemUncheckedUpdateManyWithoutQuemMandouNestedInputSchema)
      .optional(),
  });

export const MensagemUpsertWithWhereUniqueWithoutConversaInputSchema: z.ZodType<Prisma.MensagemUpsertWithWhereUniqueWithoutConversaInput> =
  z.strictObject({
    where: z.lazy(() => MensagemWhereUniqueInputSchema),
    update: z.union([
      z.lazy(() => MensagemUpdateWithoutConversaInputSchema),
      z.lazy(() => MensagemUncheckedUpdateWithoutConversaInputSchema),
    ]),
    create: z.union([
      z.lazy(() => MensagemCreateWithoutConversaInputSchema),
      z.lazy(() => MensagemUncheckedCreateWithoutConversaInputSchema),
    ]),
  });

export const MensagemUpdateWithWhereUniqueWithoutConversaInputSchema: z.ZodType<Prisma.MensagemUpdateWithWhereUniqueWithoutConversaInput> =
  z.strictObject({
    where: z.lazy(() => MensagemWhereUniqueInputSchema),
    data: z.union([
      z.lazy(() => MensagemUpdateWithoutConversaInputSchema),
      z.lazy(() => MensagemUncheckedUpdateWithoutConversaInputSchema),
    ]),
  });

export const MensagemUpdateManyWithWhereWithoutConversaInputSchema: z.ZodType<Prisma.MensagemUpdateManyWithWhereWithoutConversaInput> =
  z.strictObject({
    where: z.lazy(() => MensagemScalarWhereInputSchema),
    data: z.union([
      z.lazy(() => MensagemUpdateManyMutationInputSchema),
      z.lazy(() => MensagemUncheckedUpdateManyWithoutConversaInputSchema),
    ]),
  });

export const UsuarioCreateWithoutMensagensEnviadasInputSchema: z.ZodType<Prisma.UsuarioCreateWithoutMensagensEnviadasInput> =
  z.strictObject({
    id: z.uuid().optional(),
    email: z.string(),
    senha: z.string(),
    tipo: z.lazy(() => TipoUsuarioSchema),
    telefone: z.string(),
    status: z.lazy(() => StatusUsuarioSchema).optional(),
    criadoEm: z.coerce.date().optional(),
    veiculo: z
      .lazy(() => VeiculoCreateNestedOneWithoutMotoristaInputSchema)
      .optional(),
    atendimentosRegistrados: z
      .lazy(() => AtendimentoCreateNestedManyWithoutAtendenteInputSchema)
      .optional(),
    conversasComoAtendente: z
      .lazy(() => ConversaCreateNestedManyWithoutAtendenteInputSchema)
      .optional(),
    conversasComoMotorista: z
      .lazy(() => ConversaCreateNestedManyWithoutMotoristaInputSchema)
      .optional(),
  });

export const UsuarioUncheckedCreateWithoutMensagensEnviadasInputSchema: z.ZodType<Prisma.UsuarioUncheckedCreateWithoutMensagensEnviadasInput> =
  z.strictObject({
    id: z.uuid().optional(),
    email: z.string(),
    senha: z.string(),
    tipo: z.lazy(() => TipoUsuarioSchema),
    telefone: z.string(),
    status: z.lazy(() => StatusUsuarioSchema).optional(),
    criadoEm: z.coerce.date().optional(),
    veiculo: z
      .lazy(() => VeiculoUncheckedCreateNestedOneWithoutMotoristaInputSchema)
      .optional(),
    atendimentosRegistrados: z
      .lazy(
        () => AtendimentoUncheckedCreateNestedManyWithoutAtendenteInputSchema,
      )
      .optional(),
    conversasComoAtendente: z
      .lazy(() => ConversaUncheckedCreateNestedManyWithoutAtendenteInputSchema)
      .optional(),
    conversasComoMotorista: z
      .lazy(() => ConversaUncheckedCreateNestedManyWithoutMotoristaInputSchema)
      .optional(),
  });

export const UsuarioCreateOrConnectWithoutMensagensEnviadasInputSchema: z.ZodType<Prisma.UsuarioCreateOrConnectWithoutMensagensEnviadasInput> =
  z.strictObject({
    where: z.lazy(() => UsuarioWhereUniqueInputSchema),
    create: z.union([
      z.lazy(() => UsuarioCreateWithoutMensagensEnviadasInputSchema),
      z.lazy(() => UsuarioUncheckedCreateWithoutMensagensEnviadasInputSchema),
    ]),
  });

export const ConversaCreateWithoutMensagensInputSchema: z.ZodType<Prisma.ConversaCreateWithoutMensagensInput> =
  z.strictObject({
    id: z.uuid().optional(),
    atendente: z.lazy(
      () => UsuarioCreateNestedOneWithoutConversasComoAtendenteInputSchema,
    ),
    motorista: z.lazy(
      () => UsuarioCreateNestedOneWithoutConversasComoMotoristaInputSchema,
    ),
  });

export const ConversaUncheckedCreateWithoutMensagensInputSchema: z.ZodType<Prisma.ConversaUncheckedCreateWithoutMensagensInput> =
  z.strictObject({
    id: z.uuid().optional(),
    atendenteId: z.string(),
    motoristaId: z.string(),
  });

export const ConversaCreateOrConnectWithoutMensagensInputSchema: z.ZodType<Prisma.ConversaCreateOrConnectWithoutMensagensInput> =
  z.strictObject({
    where: z.lazy(() => ConversaWhereUniqueInputSchema),
    create: z.union([
      z.lazy(() => ConversaCreateWithoutMensagensInputSchema),
      z.lazy(() => ConversaUncheckedCreateWithoutMensagensInputSchema),
    ]),
  });

export const UsuarioUpsertWithoutMensagensEnviadasInputSchema: z.ZodType<Prisma.UsuarioUpsertWithoutMensagensEnviadasInput> =
  z.strictObject({
    update: z.union([
      z.lazy(() => UsuarioUpdateWithoutMensagensEnviadasInputSchema),
      z.lazy(() => UsuarioUncheckedUpdateWithoutMensagensEnviadasInputSchema),
    ]),
    create: z.union([
      z.lazy(() => UsuarioCreateWithoutMensagensEnviadasInputSchema),
      z.lazy(() => UsuarioUncheckedCreateWithoutMensagensEnviadasInputSchema),
    ]),
    where: z.lazy(() => UsuarioWhereInputSchema).optional(),
  });

export const UsuarioUpdateToOneWithWhereWithoutMensagensEnviadasInputSchema: z.ZodType<Prisma.UsuarioUpdateToOneWithWhereWithoutMensagensEnviadasInput> =
  z.strictObject({
    where: z.lazy(() => UsuarioWhereInputSchema).optional(),
    data: z.union([
      z.lazy(() => UsuarioUpdateWithoutMensagensEnviadasInputSchema),
      z.lazy(() => UsuarioUncheckedUpdateWithoutMensagensEnviadasInputSchema),
    ]),
  });

export const UsuarioUpdateWithoutMensagensEnviadasInputSchema: z.ZodType<Prisma.UsuarioUpdateWithoutMensagensEnviadasInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    email: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    senha: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    tipo: z
      .union([
        z.lazy(() => TipoUsuarioSchema),
        z.lazy(() => EnumTipoUsuarioFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    telefone: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    status: z
      .union([
        z.lazy(() => StatusUsuarioSchema),
        z.lazy(() => EnumStatusUsuarioFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    criadoEm: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    veiculo: z
      .lazy(() => VeiculoUpdateOneWithoutMotoristaNestedInputSchema)
      .optional(),
    atendimentosRegistrados: z
      .lazy(() => AtendimentoUpdateManyWithoutAtendenteNestedInputSchema)
      .optional(),
    conversasComoAtendente: z
      .lazy(() => ConversaUpdateManyWithoutAtendenteNestedInputSchema)
      .optional(),
    conversasComoMotorista: z
      .lazy(() => ConversaUpdateManyWithoutMotoristaNestedInputSchema)
      .optional(),
  });

export const UsuarioUncheckedUpdateWithoutMensagensEnviadasInputSchema: z.ZodType<Prisma.UsuarioUncheckedUpdateWithoutMensagensEnviadasInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    email: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    senha: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    tipo: z
      .union([
        z.lazy(() => TipoUsuarioSchema),
        z.lazy(() => EnumTipoUsuarioFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    telefone: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    status: z
      .union([
        z.lazy(() => StatusUsuarioSchema),
        z.lazy(() => EnumStatusUsuarioFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    criadoEm: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    veiculo: z
      .lazy(() => VeiculoUncheckedUpdateOneWithoutMotoristaNestedInputSchema)
      .optional(),
    atendimentosRegistrados: z
      .lazy(
        () => AtendimentoUncheckedUpdateManyWithoutAtendenteNestedInputSchema,
      )
      .optional(),
    conversasComoAtendente: z
      .lazy(() => ConversaUncheckedUpdateManyWithoutAtendenteNestedInputSchema)
      .optional(),
    conversasComoMotorista: z
      .lazy(() => ConversaUncheckedUpdateManyWithoutMotoristaNestedInputSchema)
      .optional(),
  });

export const ConversaUpsertWithoutMensagensInputSchema: z.ZodType<Prisma.ConversaUpsertWithoutMensagensInput> =
  z.strictObject({
    update: z.union([
      z.lazy(() => ConversaUpdateWithoutMensagensInputSchema),
      z.lazy(() => ConversaUncheckedUpdateWithoutMensagensInputSchema),
    ]),
    create: z.union([
      z.lazy(() => ConversaCreateWithoutMensagensInputSchema),
      z.lazy(() => ConversaUncheckedCreateWithoutMensagensInputSchema),
    ]),
    where: z.lazy(() => ConversaWhereInputSchema).optional(),
  });

export const ConversaUpdateToOneWithWhereWithoutMensagensInputSchema: z.ZodType<Prisma.ConversaUpdateToOneWithWhereWithoutMensagensInput> =
  z.strictObject({
    where: z.lazy(() => ConversaWhereInputSchema).optional(),
    data: z.union([
      z.lazy(() => ConversaUpdateWithoutMensagensInputSchema),
      z.lazy(() => ConversaUncheckedUpdateWithoutMensagensInputSchema),
    ]),
  });

export const ConversaUpdateWithoutMensagensInputSchema: z.ZodType<Prisma.ConversaUpdateWithoutMensagensInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    atendente: z
      .lazy(
        () =>
          UsuarioUpdateOneRequiredWithoutConversasComoAtendenteNestedInputSchema,
      )
      .optional(),
    motorista: z
      .lazy(
        () =>
          UsuarioUpdateOneRequiredWithoutConversasComoMotoristaNestedInputSchema,
      )
      .optional(),
  });

export const ConversaUncheckedUpdateWithoutMensagensInputSchema: z.ZodType<Prisma.ConversaUncheckedUpdateWithoutMensagensInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    atendenteId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    motoristaId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
  });

export const AtendimentoCreateWithoutNotificacoesInputSchema: z.ZodType<Prisma.AtendimentoCreateWithoutNotificacoesInput> =
  z.strictObject({
    id: z.uuid().optional(),
    protocolo: z.string(),
    endereco: z.string(),
    localDeRetorno: z.string(),
    oQueAconteceu: z.string(),
    estadoDoPaciente: z.string(),
    idadeAparente: z.number().int().optional().nullable(),
    quantidadeDePacientes: z.number().int(),
    estadoDaLesao: z.string(),
    observacoes: z.string().optional().nullable(),
    criadoEm: z.coerce.date().optional(),
    atendente: z.lazy(
      () => UsuarioCreateNestedOneWithoutAtendimentosRegistradosInputSchema,
    ),
    veiculos: z
      .lazy(
        () => VeiculoAtendimentoCreateNestedManyWithoutAtendimentoInputSchema,
      )
      .optional(),
  });

export const AtendimentoUncheckedCreateWithoutNotificacoesInputSchema: z.ZodType<Prisma.AtendimentoUncheckedCreateWithoutNotificacoesInput> =
  z.strictObject({
    id: z.uuid().optional(),
    protocolo: z.string(),
    endereco: z.string(),
    localDeRetorno: z.string(),
    oQueAconteceu: z.string(),
    estadoDoPaciente: z.string(),
    idadeAparente: z.number().int().optional().nullable(),
    quantidadeDePacientes: z.number().int(),
    estadoDaLesao: z.string(),
    observacoes: z.string().optional().nullable(),
    atendenteId: z.string(),
    criadoEm: z.coerce.date().optional(),
    veiculos: z
      .lazy(
        () =>
          VeiculoAtendimentoUncheckedCreateNestedManyWithoutAtendimentoInputSchema,
      )
      .optional(),
  });

export const AtendimentoCreateOrConnectWithoutNotificacoesInputSchema: z.ZodType<Prisma.AtendimentoCreateOrConnectWithoutNotificacoesInput> =
  z.strictObject({
    where: z.lazy(() => AtendimentoWhereUniqueInputSchema),
    create: z.union([
      z.lazy(() => AtendimentoCreateWithoutNotificacoesInputSchema),
      z.lazy(() => AtendimentoUncheckedCreateWithoutNotificacoesInputSchema),
    ]),
  });

export const AtendimentoUpsertWithoutNotificacoesInputSchema: z.ZodType<Prisma.AtendimentoUpsertWithoutNotificacoesInput> =
  z.strictObject({
    update: z.union([
      z.lazy(() => AtendimentoUpdateWithoutNotificacoesInputSchema),
      z.lazy(() => AtendimentoUncheckedUpdateWithoutNotificacoesInputSchema),
    ]),
    create: z.union([
      z.lazy(() => AtendimentoCreateWithoutNotificacoesInputSchema),
      z.lazy(() => AtendimentoUncheckedCreateWithoutNotificacoesInputSchema),
    ]),
    where: z.lazy(() => AtendimentoWhereInputSchema).optional(),
  });

export const AtendimentoUpdateToOneWithWhereWithoutNotificacoesInputSchema: z.ZodType<Prisma.AtendimentoUpdateToOneWithWhereWithoutNotificacoesInput> =
  z.strictObject({
    where: z.lazy(() => AtendimentoWhereInputSchema).optional(),
    data: z.union([
      z.lazy(() => AtendimentoUpdateWithoutNotificacoesInputSchema),
      z.lazy(() => AtendimentoUncheckedUpdateWithoutNotificacoesInputSchema),
    ]),
  });

export const AtendimentoUpdateWithoutNotificacoesInputSchema: z.ZodType<Prisma.AtendimentoUpdateWithoutNotificacoesInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    protocolo: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    endereco: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    localDeRetorno: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    oQueAconteceu: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    estadoDoPaciente: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    idadeAparente: z
      .union([
        z.number().int(),
        z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    quantidadeDePacientes: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    estadoDaLesao: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    observacoes: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    criadoEm: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    atendente: z
      .lazy(
        () =>
          UsuarioUpdateOneRequiredWithoutAtendimentosRegistradosNestedInputSchema,
      )
      .optional(),
    veiculos: z
      .lazy(
        () => VeiculoAtendimentoUpdateManyWithoutAtendimentoNestedInputSchema,
      )
      .optional(),
  });

export const AtendimentoUncheckedUpdateWithoutNotificacoesInputSchema: z.ZodType<Prisma.AtendimentoUncheckedUpdateWithoutNotificacoesInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    protocolo: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    endereco: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    localDeRetorno: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    oQueAconteceu: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    estadoDoPaciente: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    idadeAparente: z
      .union([
        z.number().int(),
        z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    quantidadeDePacientes: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    estadoDaLesao: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    observacoes: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    atendenteId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    criadoEm: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    veiculos: z
      .lazy(
        () =>
          VeiculoAtendimentoUncheckedUpdateManyWithoutAtendimentoNestedInputSchema,
      )
      .optional(),
  });

export const AtendimentoCreateManyAtendenteInputSchema: z.ZodType<Prisma.AtendimentoCreateManyAtendenteInput> =
  z.strictObject({
    id: z.uuid().optional(),
    protocolo: z.string(),
    endereco: z.string(),
    localDeRetorno: z.string(),
    oQueAconteceu: z.string(),
    estadoDoPaciente: z.string(),
    idadeAparente: z.number().int().optional().nullable(),
    quantidadeDePacientes: z.number().int(),
    estadoDaLesao: z.string(),
    observacoes: z.string().optional().nullable(),
    criadoEm: z.coerce.date().optional(),
  });

export const ConversaCreateManyAtendenteInputSchema: z.ZodType<Prisma.ConversaCreateManyAtendenteInput> =
  z.strictObject({
    id: z.uuid().optional(),
    motoristaId: z.string(),
  });

export const ConversaCreateManyMotoristaInputSchema: z.ZodType<Prisma.ConversaCreateManyMotoristaInput> =
  z.strictObject({
    id: z.uuid().optional(),
    atendenteId: z.string(),
  });

export const MensagemCreateManyQuemMandouInputSchema: z.ZodType<Prisma.MensagemCreateManyQuemMandouInput> =
  z.strictObject({
    id: z.uuid().optional(),
    texto: z.string(),
    dataDeEnvio: z.coerce.date().optional(),
    conversaId: z.string(),
  });

export const AtendimentoUpdateWithoutAtendenteInputSchema: z.ZodType<Prisma.AtendimentoUpdateWithoutAtendenteInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    protocolo: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    endereco: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    localDeRetorno: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    oQueAconteceu: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    estadoDoPaciente: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    idadeAparente: z
      .union([
        z.number().int(),
        z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    quantidadeDePacientes: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    estadoDaLesao: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    observacoes: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    criadoEm: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    veiculos: z
      .lazy(
        () => VeiculoAtendimentoUpdateManyWithoutAtendimentoNestedInputSchema,
      )
      .optional(),
    notificacoes: z
      .lazy(() => NotificacaoUpdateManyWithoutAtendimentoNestedInputSchema)
      .optional(),
  });

export const AtendimentoUncheckedUpdateWithoutAtendenteInputSchema: z.ZodType<Prisma.AtendimentoUncheckedUpdateWithoutAtendenteInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    protocolo: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    endereco: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    localDeRetorno: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    oQueAconteceu: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    estadoDoPaciente: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    idadeAparente: z
      .union([
        z.number().int(),
        z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    quantidadeDePacientes: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    estadoDaLesao: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    observacoes: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    criadoEm: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    veiculos: z
      .lazy(
        () =>
          VeiculoAtendimentoUncheckedUpdateManyWithoutAtendimentoNestedInputSchema,
      )
      .optional(),
    notificacoes: z
      .lazy(
        () => NotificacaoUncheckedUpdateManyWithoutAtendimentoNestedInputSchema,
      )
      .optional(),
  });

export const AtendimentoUncheckedUpdateManyWithoutAtendenteInputSchema: z.ZodType<Prisma.AtendimentoUncheckedUpdateManyWithoutAtendenteInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    protocolo: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    endereco: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    localDeRetorno: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    oQueAconteceu: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    estadoDoPaciente: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    idadeAparente: z
      .union([
        z.number().int(),
        z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    quantidadeDePacientes: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    estadoDaLesao: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    observacoes: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    criadoEm: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const ConversaUpdateWithoutAtendenteInputSchema: z.ZodType<Prisma.ConversaUpdateWithoutAtendenteInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    motorista: z
      .lazy(
        () =>
          UsuarioUpdateOneRequiredWithoutConversasComoMotoristaNestedInputSchema,
      )
      .optional(),
    mensagens: z
      .lazy(() => MensagemUpdateManyWithoutConversaNestedInputSchema)
      .optional(),
  });

export const ConversaUncheckedUpdateWithoutAtendenteInputSchema: z.ZodType<Prisma.ConversaUncheckedUpdateWithoutAtendenteInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    motoristaId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    mensagens: z
      .lazy(() => MensagemUncheckedUpdateManyWithoutConversaNestedInputSchema)
      .optional(),
  });

export const ConversaUncheckedUpdateManyWithoutAtendenteInputSchema: z.ZodType<Prisma.ConversaUncheckedUpdateManyWithoutAtendenteInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    motoristaId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
  });

export const ConversaUpdateWithoutMotoristaInputSchema: z.ZodType<Prisma.ConversaUpdateWithoutMotoristaInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    atendente: z
      .lazy(
        () =>
          UsuarioUpdateOneRequiredWithoutConversasComoAtendenteNestedInputSchema,
      )
      .optional(),
    mensagens: z
      .lazy(() => MensagemUpdateManyWithoutConversaNestedInputSchema)
      .optional(),
  });

export const ConversaUncheckedUpdateWithoutMotoristaInputSchema: z.ZodType<Prisma.ConversaUncheckedUpdateWithoutMotoristaInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    atendenteId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    mensagens: z
      .lazy(() => MensagemUncheckedUpdateManyWithoutConversaNestedInputSchema)
      .optional(),
  });

export const ConversaUncheckedUpdateManyWithoutMotoristaInputSchema: z.ZodType<Prisma.ConversaUncheckedUpdateManyWithoutMotoristaInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    atendenteId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
  });

export const MensagemUpdateWithoutQuemMandouInputSchema: z.ZodType<Prisma.MensagemUpdateWithoutQuemMandouInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    texto: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    dataDeEnvio: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    conversa: z
      .lazy(() => ConversaUpdateOneRequiredWithoutMensagensNestedInputSchema)
      .optional(),
  });

export const MensagemUncheckedUpdateWithoutQuemMandouInputSchema: z.ZodType<Prisma.MensagemUncheckedUpdateWithoutQuemMandouInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    texto: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    dataDeEnvio: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    conversaId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
  });

export const MensagemUncheckedUpdateManyWithoutQuemMandouInputSchema: z.ZodType<Prisma.MensagemUncheckedUpdateManyWithoutQuemMandouInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    texto: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    dataDeEnvio: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    conversaId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
  });

export const VeiculoAtendimentoCreateManyVeiculoInputSchema: z.ZodType<Prisma.VeiculoAtendimentoCreateManyVeiculoInput> =
  z.strictObject({
    id: z.uuid().optional(),
    status: z.lazy(() => StatusAtendimentoSchema).optional(),
    atendimentoId: z.string(),
  });

export const VeiculoAtendimentoUpdateWithoutVeiculoInputSchema: z.ZodType<Prisma.VeiculoAtendimentoUpdateWithoutVeiculoInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    status: z
      .union([
        z.lazy(() => StatusAtendimentoSchema),
        z.lazy(() => EnumStatusAtendimentoFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    atendimento: z
      .lazy(() => AtendimentoUpdateOneRequiredWithoutVeiculosNestedInputSchema)
      .optional(),
  });

export const VeiculoAtendimentoUncheckedUpdateWithoutVeiculoInputSchema: z.ZodType<Prisma.VeiculoAtendimentoUncheckedUpdateWithoutVeiculoInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    status: z
      .union([
        z.lazy(() => StatusAtendimentoSchema),
        z.lazy(() => EnumStatusAtendimentoFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    atendimentoId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
  });

export const VeiculoAtendimentoUncheckedUpdateManyWithoutVeiculoInputSchema: z.ZodType<Prisma.VeiculoAtendimentoUncheckedUpdateManyWithoutVeiculoInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    status: z
      .union([
        z.lazy(() => StatusAtendimentoSchema),
        z.lazy(() => EnumStatusAtendimentoFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    atendimentoId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
  });

export const VeiculoAtendimentoCreateManyAtendimentoInputSchema: z.ZodType<Prisma.VeiculoAtendimentoCreateManyAtendimentoInput> =
  z.strictObject({
    id: z.uuid().optional(),
    status: z.lazy(() => StatusAtendimentoSchema).optional(),
    veiculoId: z.string(),
  });

export const NotificacaoCreateManyAtendimentoInputSchema: z.ZodType<Prisma.NotificacaoCreateManyAtendimentoInput> =
  z.strictObject({
    id: z.uuid().optional(),
    mensagem: z.string(),
    dataDaNotificacao: z.coerce.date().optional(),
  });

export const VeiculoAtendimentoUpdateWithoutAtendimentoInputSchema: z.ZodType<Prisma.VeiculoAtendimentoUpdateWithoutAtendimentoInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    status: z
      .union([
        z.lazy(() => StatusAtendimentoSchema),
        z.lazy(() => EnumStatusAtendimentoFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    veiculo: z
      .lazy(() => VeiculoUpdateOneRequiredWithoutAtendimentosNestedInputSchema)
      .optional(),
  });

export const VeiculoAtendimentoUncheckedUpdateWithoutAtendimentoInputSchema: z.ZodType<Prisma.VeiculoAtendimentoUncheckedUpdateWithoutAtendimentoInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    status: z
      .union([
        z.lazy(() => StatusAtendimentoSchema),
        z.lazy(() => EnumStatusAtendimentoFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    veiculoId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
  });

export const VeiculoAtendimentoUncheckedUpdateManyWithoutAtendimentoInputSchema: z.ZodType<Prisma.VeiculoAtendimentoUncheckedUpdateManyWithoutAtendimentoInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    status: z
      .union([
        z.lazy(() => StatusAtendimentoSchema),
        z.lazy(() => EnumStatusAtendimentoFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    veiculoId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
  });

export const NotificacaoUpdateWithoutAtendimentoInputSchema: z.ZodType<Prisma.NotificacaoUpdateWithoutAtendimentoInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    mensagem: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    dataDaNotificacao: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const NotificacaoUncheckedUpdateWithoutAtendimentoInputSchema: z.ZodType<Prisma.NotificacaoUncheckedUpdateWithoutAtendimentoInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    mensagem: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    dataDaNotificacao: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const NotificacaoUncheckedUpdateManyWithoutAtendimentoInputSchema: z.ZodType<Prisma.NotificacaoUncheckedUpdateManyWithoutAtendimentoInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    mensagem: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    dataDaNotificacao: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const MensagemCreateManyConversaInputSchema: z.ZodType<Prisma.MensagemCreateManyConversaInput> =
  z.strictObject({
    id: z.uuid().optional(),
    texto: z.string(),
    dataDeEnvio: z.coerce.date().optional(),
    quemMandouId: z.string(),
  });

export const MensagemUpdateWithoutConversaInputSchema: z.ZodType<Prisma.MensagemUpdateWithoutConversaInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    texto: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    dataDeEnvio: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    quemMandou: z
      .lazy(
        () => UsuarioUpdateOneRequiredWithoutMensagensEnviadasNestedInputSchema,
      )
      .optional(),
  });

export const MensagemUncheckedUpdateWithoutConversaInputSchema: z.ZodType<Prisma.MensagemUncheckedUpdateWithoutConversaInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    texto: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    dataDeEnvio: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    quemMandouId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
  });

export const MensagemUncheckedUpdateManyWithoutConversaInputSchema: z.ZodType<Prisma.MensagemUncheckedUpdateManyWithoutConversaInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    texto: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    dataDeEnvio: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    quemMandouId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
  });

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UsuarioFindFirstArgsSchema: z.ZodType<Prisma.UsuarioFindFirstArgs> =
  z
    .object({
      select: UsuarioSelectSchema.optional(),
      include: UsuarioIncludeSchema.optional(),
      where: UsuarioWhereInputSchema.optional(),
      orderBy: z
        .union([
          UsuarioOrderByWithRelationInputSchema.array(),
          UsuarioOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: UsuarioWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          UsuarioScalarFieldEnumSchema,
          UsuarioScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const UsuarioFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UsuarioFindFirstOrThrowArgs> =
  z
    .object({
      select: UsuarioSelectSchema.optional(),
      include: UsuarioIncludeSchema.optional(),
      where: UsuarioWhereInputSchema.optional(),
      orderBy: z
        .union([
          UsuarioOrderByWithRelationInputSchema.array(),
          UsuarioOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: UsuarioWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          UsuarioScalarFieldEnumSchema,
          UsuarioScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const UsuarioFindManyArgsSchema: z.ZodType<Prisma.UsuarioFindManyArgs> =
  z
    .object({
      select: UsuarioSelectSchema.optional(),
      include: UsuarioIncludeSchema.optional(),
      where: UsuarioWhereInputSchema.optional(),
      orderBy: z
        .union([
          UsuarioOrderByWithRelationInputSchema.array(),
          UsuarioOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: UsuarioWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          UsuarioScalarFieldEnumSchema,
          UsuarioScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const UsuarioAggregateArgsSchema: z.ZodType<Prisma.UsuarioAggregateArgs> =
  z
    .object({
      where: UsuarioWhereInputSchema.optional(),
      orderBy: z
        .union([
          UsuarioOrderByWithRelationInputSchema.array(),
          UsuarioOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: UsuarioWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const UsuarioGroupByArgsSchema: z.ZodType<Prisma.UsuarioGroupByArgs> = z
  .object({
    where: UsuarioWhereInputSchema.optional(),
    orderBy: z
      .union([
        UsuarioOrderByWithAggregationInputSchema.array(),
        UsuarioOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: UsuarioScalarFieldEnumSchema.array(),
    having: UsuarioScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const UsuarioFindUniqueArgsSchema: z.ZodType<Prisma.UsuarioFindUniqueArgs> =
  z
    .object({
      select: UsuarioSelectSchema.optional(),
      include: UsuarioIncludeSchema.optional(),
      where: UsuarioWhereUniqueInputSchema,
    })
    .strict();

export const UsuarioFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UsuarioFindUniqueOrThrowArgs> =
  z
    .object({
      select: UsuarioSelectSchema.optional(),
      include: UsuarioIncludeSchema.optional(),
      where: UsuarioWhereUniqueInputSchema,
    })
    .strict();

export const VeiculoFindFirstArgsSchema: z.ZodType<Prisma.VeiculoFindFirstArgs> =
  z
    .object({
      select: VeiculoSelectSchema.optional(),
      include: VeiculoIncludeSchema.optional(),
      where: VeiculoWhereInputSchema.optional(),
      orderBy: z
        .union([
          VeiculoOrderByWithRelationInputSchema.array(),
          VeiculoOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: VeiculoWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          VeiculoScalarFieldEnumSchema,
          VeiculoScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const VeiculoFindFirstOrThrowArgsSchema: z.ZodType<Prisma.VeiculoFindFirstOrThrowArgs> =
  z
    .object({
      select: VeiculoSelectSchema.optional(),
      include: VeiculoIncludeSchema.optional(),
      where: VeiculoWhereInputSchema.optional(),
      orderBy: z
        .union([
          VeiculoOrderByWithRelationInputSchema.array(),
          VeiculoOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: VeiculoWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          VeiculoScalarFieldEnumSchema,
          VeiculoScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const VeiculoFindManyArgsSchema: z.ZodType<Prisma.VeiculoFindManyArgs> =
  z
    .object({
      select: VeiculoSelectSchema.optional(),
      include: VeiculoIncludeSchema.optional(),
      where: VeiculoWhereInputSchema.optional(),
      orderBy: z
        .union([
          VeiculoOrderByWithRelationInputSchema.array(),
          VeiculoOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: VeiculoWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          VeiculoScalarFieldEnumSchema,
          VeiculoScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const VeiculoAggregateArgsSchema: z.ZodType<Prisma.VeiculoAggregateArgs> =
  z
    .object({
      where: VeiculoWhereInputSchema.optional(),
      orderBy: z
        .union([
          VeiculoOrderByWithRelationInputSchema.array(),
          VeiculoOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: VeiculoWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const VeiculoGroupByArgsSchema: z.ZodType<Prisma.VeiculoGroupByArgs> = z
  .object({
    where: VeiculoWhereInputSchema.optional(),
    orderBy: z
      .union([
        VeiculoOrderByWithAggregationInputSchema.array(),
        VeiculoOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: VeiculoScalarFieldEnumSchema.array(),
    having: VeiculoScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const VeiculoFindUniqueArgsSchema: z.ZodType<Prisma.VeiculoFindUniqueArgs> =
  z
    .object({
      select: VeiculoSelectSchema.optional(),
      include: VeiculoIncludeSchema.optional(),
      where: VeiculoWhereUniqueInputSchema,
    })
    .strict();

export const VeiculoFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.VeiculoFindUniqueOrThrowArgs> =
  z
    .object({
      select: VeiculoSelectSchema.optional(),
      include: VeiculoIncludeSchema.optional(),
      where: VeiculoWhereUniqueInputSchema,
    })
    .strict();

export const AtendimentoFindFirstArgsSchema: z.ZodType<Prisma.AtendimentoFindFirstArgs> =
  z
    .object({
      select: AtendimentoSelectSchema.optional(),
      include: AtendimentoIncludeSchema.optional(),
      where: AtendimentoWhereInputSchema.optional(),
      orderBy: z
        .union([
          AtendimentoOrderByWithRelationInputSchema.array(),
          AtendimentoOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: AtendimentoWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          AtendimentoScalarFieldEnumSchema,
          AtendimentoScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const AtendimentoFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AtendimentoFindFirstOrThrowArgs> =
  z
    .object({
      select: AtendimentoSelectSchema.optional(),
      include: AtendimentoIncludeSchema.optional(),
      where: AtendimentoWhereInputSchema.optional(),
      orderBy: z
        .union([
          AtendimentoOrderByWithRelationInputSchema.array(),
          AtendimentoOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: AtendimentoWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          AtendimentoScalarFieldEnumSchema,
          AtendimentoScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const AtendimentoFindManyArgsSchema: z.ZodType<Prisma.AtendimentoFindManyArgs> =
  z
    .object({
      select: AtendimentoSelectSchema.optional(),
      include: AtendimentoIncludeSchema.optional(),
      where: AtendimentoWhereInputSchema.optional(),
      orderBy: z
        .union([
          AtendimentoOrderByWithRelationInputSchema.array(),
          AtendimentoOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: AtendimentoWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          AtendimentoScalarFieldEnumSchema,
          AtendimentoScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const AtendimentoAggregateArgsSchema: z.ZodType<Prisma.AtendimentoAggregateArgs> =
  z
    .object({
      where: AtendimentoWhereInputSchema.optional(),
      orderBy: z
        .union([
          AtendimentoOrderByWithRelationInputSchema.array(),
          AtendimentoOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: AtendimentoWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const AtendimentoGroupByArgsSchema: z.ZodType<Prisma.AtendimentoGroupByArgs> =
  z
    .object({
      where: AtendimentoWhereInputSchema.optional(),
      orderBy: z
        .union([
          AtendimentoOrderByWithAggregationInputSchema.array(),
          AtendimentoOrderByWithAggregationInputSchema,
        ])
        .optional(),
      by: AtendimentoScalarFieldEnumSchema.array(),
      having: AtendimentoScalarWhereWithAggregatesInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const AtendimentoFindUniqueArgsSchema: z.ZodType<Prisma.AtendimentoFindUniqueArgs> =
  z
    .object({
      select: AtendimentoSelectSchema.optional(),
      include: AtendimentoIncludeSchema.optional(),
      where: AtendimentoWhereUniqueInputSchema,
    })
    .strict();

export const AtendimentoFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AtendimentoFindUniqueOrThrowArgs> =
  z
    .object({
      select: AtendimentoSelectSchema.optional(),
      include: AtendimentoIncludeSchema.optional(),
      where: AtendimentoWhereUniqueInputSchema,
    })
    .strict();

export const VeiculoAtendimentoFindFirstArgsSchema: z.ZodType<Prisma.VeiculoAtendimentoFindFirstArgs> =
  z
    .object({
      select: VeiculoAtendimentoSelectSchema.optional(),
      include: VeiculoAtendimentoIncludeSchema.optional(),
      where: VeiculoAtendimentoWhereInputSchema.optional(),
      orderBy: z
        .union([
          VeiculoAtendimentoOrderByWithRelationInputSchema.array(),
          VeiculoAtendimentoOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: VeiculoAtendimentoWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          VeiculoAtendimentoScalarFieldEnumSchema,
          VeiculoAtendimentoScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const VeiculoAtendimentoFindFirstOrThrowArgsSchema: z.ZodType<Prisma.VeiculoAtendimentoFindFirstOrThrowArgs> =
  z
    .object({
      select: VeiculoAtendimentoSelectSchema.optional(),
      include: VeiculoAtendimentoIncludeSchema.optional(),
      where: VeiculoAtendimentoWhereInputSchema.optional(),
      orderBy: z
        .union([
          VeiculoAtendimentoOrderByWithRelationInputSchema.array(),
          VeiculoAtendimentoOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: VeiculoAtendimentoWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          VeiculoAtendimentoScalarFieldEnumSchema,
          VeiculoAtendimentoScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const VeiculoAtendimentoFindManyArgsSchema: z.ZodType<Prisma.VeiculoAtendimentoFindManyArgs> =
  z
    .object({
      select: VeiculoAtendimentoSelectSchema.optional(),
      include: VeiculoAtendimentoIncludeSchema.optional(),
      where: VeiculoAtendimentoWhereInputSchema.optional(),
      orderBy: z
        .union([
          VeiculoAtendimentoOrderByWithRelationInputSchema.array(),
          VeiculoAtendimentoOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: VeiculoAtendimentoWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          VeiculoAtendimentoScalarFieldEnumSchema,
          VeiculoAtendimentoScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const VeiculoAtendimentoAggregateArgsSchema: z.ZodType<Prisma.VeiculoAtendimentoAggregateArgs> =
  z
    .object({
      where: VeiculoAtendimentoWhereInputSchema.optional(),
      orderBy: z
        .union([
          VeiculoAtendimentoOrderByWithRelationInputSchema.array(),
          VeiculoAtendimentoOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: VeiculoAtendimentoWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const VeiculoAtendimentoGroupByArgsSchema: z.ZodType<Prisma.VeiculoAtendimentoGroupByArgs> =
  z
    .object({
      where: VeiculoAtendimentoWhereInputSchema.optional(),
      orderBy: z
        .union([
          VeiculoAtendimentoOrderByWithAggregationInputSchema.array(),
          VeiculoAtendimentoOrderByWithAggregationInputSchema,
        ])
        .optional(),
      by: VeiculoAtendimentoScalarFieldEnumSchema.array(),
      having: VeiculoAtendimentoScalarWhereWithAggregatesInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const VeiculoAtendimentoFindUniqueArgsSchema: z.ZodType<Prisma.VeiculoAtendimentoFindUniqueArgs> =
  z
    .object({
      select: VeiculoAtendimentoSelectSchema.optional(),
      include: VeiculoAtendimentoIncludeSchema.optional(),
      where: VeiculoAtendimentoWhereUniqueInputSchema,
    })
    .strict();

export const VeiculoAtendimentoFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.VeiculoAtendimentoFindUniqueOrThrowArgs> =
  z
    .object({
      select: VeiculoAtendimentoSelectSchema.optional(),
      include: VeiculoAtendimentoIncludeSchema.optional(),
      where: VeiculoAtendimentoWhereUniqueInputSchema,
    })
    .strict();

export const ConversaFindFirstArgsSchema: z.ZodType<Prisma.ConversaFindFirstArgs> =
  z
    .object({
      select: ConversaSelectSchema.optional(),
      include: ConversaIncludeSchema.optional(),
      where: ConversaWhereInputSchema.optional(),
      orderBy: z
        .union([
          ConversaOrderByWithRelationInputSchema.array(),
          ConversaOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: ConversaWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          ConversaScalarFieldEnumSchema,
          ConversaScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const ConversaFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ConversaFindFirstOrThrowArgs> =
  z
    .object({
      select: ConversaSelectSchema.optional(),
      include: ConversaIncludeSchema.optional(),
      where: ConversaWhereInputSchema.optional(),
      orderBy: z
        .union([
          ConversaOrderByWithRelationInputSchema.array(),
          ConversaOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: ConversaWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          ConversaScalarFieldEnumSchema,
          ConversaScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const ConversaFindManyArgsSchema: z.ZodType<Prisma.ConversaFindManyArgs> =
  z
    .object({
      select: ConversaSelectSchema.optional(),
      include: ConversaIncludeSchema.optional(),
      where: ConversaWhereInputSchema.optional(),
      orderBy: z
        .union([
          ConversaOrderByWithRelationInputSchema.array(),
          ConversaOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: ConversaWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          ConversaScalarFieldEnumSchema,
          ConversaScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const ConversaAggregateArgsSchema: z.ZodType<Prisma.ConversaAggregateArgs> =
  z
    .object({
      where: ConversaWhereInputSchema.optional(),
      orderBy: z
        .union([
          ConversaOrderByWithRelationInputSchema.array(),
          ConversaOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: ConversaWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const ConversaGroupByArgsSchema: z.ZodType<Prisma.ConversaGroupByArgs> =
  z
    .object({
      where: ConversaWhereInputSchema.optional(),
      orderBy: z
        .union([
          ConversaOrderByWithAggregationInputSchema.array(),
          ConversaOrderByWithAggregationInputSchema,
        ])
        .optional(),
      by: ConversaScalarFieldEnumSchema.array(),
      having: ConversaScalarWhereWithAggregatesInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const ConversaFindUniqueArgsSchema: z.ZodType<Prisma.ConversaFindUniqueArgs> =
  z
    .object({
      select: ConversaSelectSchema.optional(),
      include: ConversaIncludeSchema.optional(),
      where: ConversaWhereUniqueInputSchema,
    })
    .strict();

export const ConversaFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ConversaFindUniqueOrThrowArgs> =
  z
    .object({
      select: ConversaSelectSchema.optional(),
      include: ConversaIncludeSchema.optional(),
      where: ConversaWhereUniqueInputSchema,
    })
    .strict();

export const MensagemFindFirstArgsSchema: z.ZodType<Prisma.MensagemFindFirstArgs> =
  z
    .object({
      select: MensagemSelectSchema.optional(),
      include: MensagemIncludeSchema.optional(),
      where: MensagemWhereInputSchema.optional(),
      orderBy: z
        .union([
          MensagemOrderByWithRelationInputSchema.array(),
          MensagemOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: MensagemWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          MensagemScalarFieldEnumSchema,
          MensagemScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const MensagemFindFirstOrThrowArgsSchema: z.ZodType<Prisma.MensagemFindFirstOrThrowArgs> =
  z
    .object({
      select: MensagemSelectSchema.optional(),
      include: MensagemIncludeSchema.optional(),
      where: MensagemWhereInputSchema.optional(),
      orderBy: z
        .union([
          MensagemOrderByWithRelationInputSchema.array(),
          MensagemOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: MensagemWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          MensagemScalarFieldEnumSchema,
          MensagemScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const MensagemFindManyArgsSchema: z.ZodType<Prisma.MensagemFindManyArgs> =
  z
    .object({
      select: MensagemSelectSchema.optional(),
      include: MensagemIncludeSchema.optional(),
      where: MensagemWhereInputSchema.optional(),
      orderBy: z
        .union([
          MensagemOrderByWithRelationInputSchema.array(),
          MensagemOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: MensagemWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          MensagemScalarFieldEnumSchema,
          MensagemScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const MensagemAggregateArgsSchema: z.ZodType<Prisma.MensagemAggregateArgs> =
  z
    .object({
      where: MensagemWhereInputSchema.optional(),
      orderBy: z
        .union([
          MensagemOrderByWithRelationInputSchema.array(),
          MensagemOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: MensagemWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const MensagemGroupByArgsSchema: z.ZodType<Prisma.MensagemGroupByArgs> =
  z
    .object({
      where: MensagemWhereInputSchema.optional(),
      orderBy: z
        .union([
          MensagemOrderByWithAggregationInputSchema.array(),
          MensagemOrderByWithAggregationInputSchema,
        ])
        .optional(),
      by: MensagemScalarFieldEnumSchema.array(),
      having: MensagemScalarWhereWithAggregatesInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const MensagemFindUniqueArgsSchema: z.ZodType<Prisma.MensagemFindUniqueArgs> =
  z
    .object({
      select: MensagemSelectSchema.optional(),
      include: MensagemIncludeSchema.optional(),
      where: MensagemWhereUniqueInputSchema,
    })
    .strict();

export const MensagemFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.MensagemFindUniqueOrThrowArgs> =
  z
    .object({
      select: MensagemSelectSchema.optional(),
      include: MensagemIncludeSchema.optional(),
      where: MensagemWhereUniqueInputSchema,
    })
    .strict();

export const NotificacaoFindFirstArgsSchema: z.ZodType<Prisma.NotificacaoFindFirstArgs> =
  z
    .object({
      select: NotificacaoSelectSchema.optional(),
      include: NotificacaoIncludeSchema.optional(),
      where: NotificacaoWhereInputSchema.optional(),
      orderBy: z
        .union([
          NotificacaoOrderByWithRelationInputSchema.array(),
          NotificacaoOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: NotificacaoWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          NotificacaoScalarFieldEnumSchema,
          NotificacaoScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const NotificacaoFindFirstOrThrowArgsSchema: z.ZodType<Prisma.NotificacaoFindFirstOrThrowArgs> =
  z
    .object({
      select: NotificacaoSelectSchema.optional(),
      include: NotificacaoIncludeSchema.optional(),
      where: NotificacaoWhereInputSchema.optional(),
      orderBy: z
        .union([
          NotificacaoOrderByWithRelationInputSchema.array(),
          NotificacaoOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: NotificacaoWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          NotificacaoScalarFieldEnumSchema,
          NotificacaoScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const NotificacaoFindManyArgsSchema: z.ZodType<Prisma.NotificacaoFindManyArgs> =
  z
    .object({
      select: NotificacaoSelectSchema.optional(),
      include: NotificacaoIncludeSchema.optional(),
      where: NotificacaoWhereInputSchema.optional(),
      orderBy: z
        .union([
          NotificacaoOrderByWithRelationInputSchema.array(),
          NotificacaoOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: NotificacaoWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          NotificacaoScalarFieldEnumSchema,
          NotificacaoScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const NotificacaoAggregateArgsSchema: z.ZodType<Prisma.NotificacaoAggregateArgs> =
  z
    .object({
      where: NotificacaoWhereInputSchema.optional(),
      orderBy: z
        .union([
          NotificacaoOrderByWithRelationInputSchema.array(),
          NotificacaoOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: NotificacaoWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const NotificacaoGroupByArgsSchema: z.ZodType<Prisma.NotificacaoGroupByArgs> =
  z
    .object({
      where: NotificacaoWhereInputSchema.optional(),
      orderBy: z
        .union([
          NotificacaoOrderByWithAggregationInputSchema.array(),
          NotificacaoOrderByWithAggregationInputSchema,
        ])
        .optional(),
      by: NotificacaoScalarFieldEnumSchema.array(),
      having: NotificacaoScalarWhereWithAggregatesInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const NotificacaoFindUniqueArgsSchema: z.ZodType<Prisma.NotificacaoFindUniqueArgs> =
  z
    .object({
      select: NotificacaoSelectSchema.optional(),
      include: NotificacaoIncludeSchema.optional(),
      where: NotificacaoWhereUniqueInputSchema,
    })
    .strict();

export const NotificacaoFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.NotificacaoFindUniqueOrThrowArgs> =
  z
    .object({
      select: NotificacaoSelectSchema.optional(),
      include: NotificacaoIncludeSchema.optional(),
      where: NotificacaoWhereUniqueInputSchema,
    })
    .strict();

export const UsuarioCreateArgsSchema: z.ZodType<Prisma.UsuarioCreateArgs> = z
  .object({
    select: UsuarioSelectSchema.optional(),
    include: UsuarioIncludeSchema.optional(),
    data: z.union([
      UsuarioCreateInputSchema,
      UsuarioUncheckedCreateInputSchema,
    ]),
  })
  .strict();

export const UsuarioUpsertArgsSchema: z.ZodType<Prisma.UsuarioUpsertArgs> = z
  .object({
    select: UsuarioSelectSchema.optional(),
    include: UsuarioIncludeSchema.optional(),
    where: UsuarioWhereUniqueInputSchema,
    create: z.union([
      UsuarioCreateInputSchema,
      UsuarioUncheckedCreateInputSchema,
    ]),
    update: z.union([
      UsuarioUpdateInputSchema,
      UsuarioUncheckedUpdateInputSchema,
    ]),
  })
  .strict();

export const UsuarioCreateManyArgsSchema: z.ZodType<Prisma.UsuarioCreateManyArgs> =
  z
    .object({
      data: z.union([
        UsuarioCreateManyInputSchema,
        UsuarioCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const UsuarioCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UsuarioCreateManyAndReturnArgs> =
  z
    .object({
      data: z.union([
        UsuarioCreateManyInputSchema,
        UsuarioCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const UsuarioDeleteArgsSchema: z.ZodType<Prisma.UsuarioDeleteArgs> = z
  .object({
    select: UsuarioSelectSchema.optional(),
    include: UsuarioIncludeSchema.optional(),
    where: UsuarioWhereUniqueInputSchema,
  })
  .strict();

export const UsuarioUpdateArgsSchema: z.ZodType<Prisma.UsuarioUpdateArgs> = z
  .object({
    select: UsuarioSelectSchema.optional(),
    include: UsuarioIncludeSchema.optional(),
    data: z.union([
      UsuarioUpdateInputSchema,
      UsuarioUncheckedUpdateInputSchema,
    ]),
    where: UsuarioWhereUniqueInputSchema,
  })
  .strict();

export const UsuarioUpdateManyArgsSchema: z.ZodType<Prisma.UsuarioUpdateManyArgs> =
  z
    .object({
      data: z.union([
        UsuarioUpdateManyMutationInputSchema,
        UsuarioUncheckedUpdateManyInputSchema,
      ]),
      where: UsuarioWhereInputSchema.optional(),
      limit: z.number().optional(),
    })
    .strict();

export const UsuarioUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.UsuarioUpdateManyAndReturnArgs> =
  z
    .object({
      data: z.union([
        UsuarioUpdateManyMutationInputSchema,
        UsuarioUncheckedUpdateManyInputSchema,
      ]),
      where: UsuarioWhereInputSchema.optional(),
      limit: z.number().optional(),
    })
    .strict();

export const UsuarioDeleteManyArgsSchema: z.ZodType<Prisma.UsuarioDeleteManyArgs> =
  z
    .object({
      where: UsuarioWhereInputSchema.optional(),
      limit: z.number().optional(),
    })
    .strict();

export const VeiculoCreateArgsSchema: z.ZodType<Prisma.VeiculoCreateArgs> = z
  .object({
    select: VeiculoSelectSchema.optional(),
    include: VeiculoIncludeSchema.optional(),
    data: z.union([
      VeiculoCreateInputSchema,
      VeiculoUncheckedCreateInputSchema,
    ]),
  })
  .strict();

export const VeiculoUpsertArgsSchema: z.ZodType<Prisma.VeiculoUpsertArgs> = z
  .object({
    select: VeiculoSelectSchema.optional(),
    include: VeiculoIncludeSchema.optional(),
    where: VeiculoWhereUniqueInputSchema,
    create: z.union([
      VeiculoCreateInputSchema,
      VeiculoUncheckedCreateInputSchema,
    ]),
    update: z.union([
      VeiculoUpdateInputSchema,
      VeiculoUncheckedUpdateInputSchema,
    ]),
  })
  .strict();

export const VeiculoCreateManyArgsSchema: z.ZodType<Prisma.VeiculoCreateManyArgs> =
  z
    .object({
      data: z.union([
        VeiculoCreateManyInputSchema,
        VeiculoCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const VeiculoCreateManyAndReturnArgsSchema: z.ZodType<Prisma.VeiculoCreateManyAndReturnArgs> =
  z
    .object({
      data: z.union([
        VeiculoCreateManyInputSchema,
        VeiculoCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const VeiculoDeleteArgsSchema: z.ZodType<Prisma.VeiculoDeleteArgs> = z
  .object({
    select: VeiculoSelectSchema.optional(),
    include: VeiculoIncludeSchema.optional(),
    where: VeiculoWhereUniqueInputSchema,
  })
  .strict();

export const VeiculoUpdateArgsSchema: z.ZodType<Prisma.VeiculoUpdateArgs> = z
  .object({
    select: VeiculoSelectSchema.optional(),
    include: VeiculoIncludeSchema.optional(),
    data: z.union([
      VeiculoUpdateInputSchema,
      VeiculoUncheckedUpdateInputSchema,
    ]),
    where: VeiculoWhereUniqueInputSchema,
  })
  .strict();

export const VeiculoUpdateManyArgsSchema: z.ZodType<Prisma.VeiculoUpdateManyArgs> =
  z
    .object({
      data: z.union([
        VeiculoUpdateManyMutationInputSchema,
        VeiculoUncheckedUpdateManyInputSchema,
      ]),
      where: VeiculoWhereInputSchema.optional(),
      limit: z.number().optional(),
    })
    .strict();

export const VeiculoUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.VeiculoUpdateManyAndReturnArgs> =
  z
    .object({
      data: z.union([
        VeiculoUpdateManyMutationInputSchema,
        VeiculoUncheckedUpdateManyInputSchema,
      ]),
      where: VeiculoWhereInputSchema.optional(),
      limit: z.number().optional(),
    })
    .strict();

export const VeiculoDeleteManyArgsSchema: z.ZodType<Prisma.VeiculoDeleteManyArgs> =
  z
    .object({
      where: VeiculoWhereInputSchema.optional(),
      limit: z.number().optional(),
    })
    .strict();

export const AtendimentoCreateArgsSchema: z.ZodType<Prisma.AtendimentoCreateArgs> =
  z
    .object({
      select: AtendimentoSelectSchema.optional(),
      include: AtendimentoIncludeSchema.optional(),
      data: z.union([
        AtendimentoCreateInputSchema,
        AtendimentoUncheckedCreateInputSchema,
      ]),
    })
    .strict();

export const AtendimentoUpsertArgsSchema: z.ZodType<Prisma.AtendimentoUpsertArgs> =
  z
    .object({
      select: AtendimentoSelectSchema.optional(),
      include: AtendimentoIncludeSchema.optional(),
      where: AtendimentoWhereUniqueInputSchema,
      create: z.union([
        AtendimentoCreateInputSchema,
        AtendimentoUncheckedCreateInputSchema,
      ]),
      update: z.union([
        AtendimentoUpdateInputSchema,
        AtendimentoUncheckedUpdateInputSchema,
      ]),
    })
    .strict();

export const AtendimentoCreateManyArgsSchema: z.ZodType<Prisma.AtendimentoCreateManyArgs> =
  z
    .object({
      data: z.union([
        AtendimentoCreateManyInputSchema,
        AtendimentoCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const AtendimentoCreateManyAndReturnArgsSchema: z.ZodType<Prisma.AtendimentoCreateManyAndReturnArgs> =
  z
    .object({
      data: z.union([
        AtendimentoCreateManyInputSchema,
        AtendimentoCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const AtendimentoDeleteArgsSchema: z.ZodType<Prisma.AtendimentoDeleteArgs> =
  z
    .object({
      select: AtendimentoSelectSchema.optional(),
      include: AtendimentoIncludeSchema.optional(),
      where: AtendimentoWhereUniqueInputSchema,
    })
    .strict();

export const AtendimentoUpdateArgsSchema: z.ZodType<Prisma.AtendimentoUpdateArgs> =
  z
    .object({
      select: AtendimentoSelectSchema.optional(),
      include: AtendimentoIncludeSchema.optional(),
      data: z.union([
        AtendimentoUpdateInputSchema,
        AtendimentoUncheckedUpdateInputSchema,
      ]),
      where: AtendimentoWhereUniqueInputSchema,
    })
    .strict();

export const AtendimentoUpdateManyArgsSchema: z.ZodType<Prisma.AtendimentoUpdateManyArgs> =
  z
    .object({
      data: z.union([
        AtendimentoUpdateManyMutationInputSchema,
        AtendimentoUncheckedUpdateManyInputSchema,
      ]),
      where: AtendimentoWhereInputSchema.optional(),
      limit: z.number().optional(),
    })
    .strict();

export const AtendimentoUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.AtendimentoUpdateManyAndReturnArgs> =
  z
    .object({
      data: z.union([
        AtendimentoUpdateManyMutationInputSchema,
        AtendimentoUncheckedUpdateManyInputSchema,
      ]),
      where: AtendimentoWhereInputSchema.optional(),
      limit: z.number().optional(),
    })
    .strict();

export const AtendimentoDeleteManyArgsSchema: z.ZodType<Prisma.AtendimentoDeleteManyArgs> =
  z
    .object({
      where: AtendimentoWhereInputSchema.optional(),
      limit: z.number().optional(),
    })
    .strict();

export const VeiculoAtendimentoCreateArgsSchema: z.ZodType<Prisma.VeiculoAtendimentoCreateArgs> =
  z
    .object({
      select: VeiculoAtendimentoSelectSchema.optional(),
      include: VeiculoAtendimentoIncludeSchema.optional(),
      data: z.union([
        VeiculoAtendimentoCreateInputSchema,
        VeiculoAtendimentoUncheckedCreateInputSchema,
      ]),
    })
    .strict();

export const VeiculoAtendimentoUpsertArgsSchema: z.ZodType<Prisma.VeiculoAtendimentoUpsertArgs> =
  z
    .object({
      select: VeiculoAtendimentoSelectSchema.optional(),
      include: VeiculoAtendimentoIncludeSchema.optional(),
      where: VeiculoAtendimentoWhereUniqueInputSchema,
      create: z.union([
        VeiculoAtendimentoCreateInputSchema,
        VeiculoAtendimentoUncheckedCreateInputSchema,
      ]),
      update: z.union([
        VeiculoAtendimentoUpdateInputSchema,
        VeiculoAtendimentoUncheckedUpdateInputSchema,
      ]),
    })
    .strict();

export const VeiculoAtendimentoCreateManyArgsSchema: z.ZodType<Prisma.VeiculoAtendimentoCreateManyArgs> =
  z
    .object({
      data: z.union([
        VeiculoAtendimentoCreateManyInputSchema,
        VeiculoAtendimentoCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const VeiculoAtendimentoCreateManyAndReturnArgsSchema: z.ZodType<Prisma.VeiculoAtendimentoCreateManyAndReturnArgs> =
  z
    .object({
      data: z.union([
        VeiculoAtendimentoCreateManyInputSchema,
        VeiculoAtendimentoCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const VeiculoAtendimentoDeleteArgsSchema: z.ZodType<Prisma.VeiculoAtendimentoDeleteArgs> =
  z
    .object({
      select: VeiculoAtendimentoSelectSchema.optional(),
      include: VeiculoAtendimentoIncludeSchema.optional(),
      where: VeiculoAtendimentoWhereUniqueInputSchema,
    })
    .strict();

export const VeiculoAtendimentoUpdateArgsSchema: z.ZodType<Prisma.VeiculoAtendimentoUpdateArgs> =
  z
    .object({
      select: VeiculoAtendimentoSelectSchema.optional(),
      include: VeiculoAtendimentoIncludeSchema.optional(),
      data: z.union([
        VeiculoAtendimentoUpdateInputSchema,
        VeiculoAtendimentoUncheckedUpdateInputSchema,
      ]),
      where: VeiculoAtendimentoWhereUniqueInputSchema,
    })
    .strict();

export const VeiculoAtendimentoUpdateManyArgsSchema: z.ZodType<Prisma.VeiculoAtendimentoUpdateManyArgs> =
  z
    .object({
      data: z.union([
        VeiculoAtendimentoUpdateManyMutationInputSchema,
        VeiculoAtendimentoUncheckedUpdateManyInputSchema,
      ]),
      where: VeiculoAtendimentoWhereInputSchema.optional(),
      limit: z.number().optional(),
    })
    .strict();

export const VeiculoAtendimentoUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.VeiculoAtendimentoUpdateManyAndReturnArgs> =
  z
    .object({
      data: z.union([
        VeiculoAtendimentoUpdateManyMutationInputSchema,
        VeiculoAtendimentoUncheckedUpdateManyInputSchema,
      ]),
      where: VeiculoAtendimentoWhereInputSchema.optional(),
      limit: z.number().optional(),
    })
    .strict();

export const VeiculoAtendimentoDeleteManyArgsSchema: z.ZodType<Prisma.VeiculoAtendimentoDeleteManyArgs> =
  z
    .object({
      where: VeiculoAtendimentoWhereInputSchema.optional(),
      limit: z.number().optional(),
    })
    .strict();

export const ConversaCreateArgsSchema: z.ZodType<Prisma.ConversaCreateArgs> = z
  .object({
    select: ConversaSelectSchema.optional(),
    include: ConversaIncludeSchema.optional(),
    data: z.union([
      ConversaCreateInputSchema,
      ConversaUncheckedCreateInputSchema,
    ]),
  })
  .strict();

export const ConversaUpsertArgsSchema: z.ZodType<Prisma.ConversaUpsertArgs> = z
  .object({
    select: ConversaSelectSchema.optional(),
    include: ConversaIncludeSchema.optional(),
    where: ConversaWhereUniqueInputSchema,
    create: z.union([
      ConversaCreateInputSchema,
      ConversaUncheckedCreateInputSchema,
    ]),
    update: z.union([
      ConversaUpdateInputSchema,
      ConversaUncheckedUpdateInputSchema,
    ]),
  })
  .strict();

export const ConversaCreateManyArgsSchema: z.ZodType<Prisma.ConversaCreateManyArgs> =
  z
    .object({
      data: z.union([
        ConversaCreateManyInputSchema,
        ConversaCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const ConversaCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ConversaCreateManyAndReturnArgs> =
  z
    .object({
      data: z.union([
        ConversaCreateManyInputSchema,
        ConversaCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const ConversaDeleteArgsSchema: z.ZodType<Prisma.ConversaDeleteArgs> = z
  .object({
    select: ConversaSelectSchema.optional(),
    include: ConversaIncludeSchema.optional(),
    where: ConversaWhereUniqueInputSchema,
  })
  .strict();

export const ConversaUpdateArgsSchema: z.ZodType<Prisma.ConversaUpdateArgs> = z
  .object({
    select: ConversaSelectSchema.optional(),
    include: ConversaIncludeSchema.optional(),
    data: z.union([
      ConversaUpdateInputSchema,
      ConversaUncheckedUpdateInputSchema,
    ]),
    where: ConversaWhereUniqueInputSchema,
  })
  .strict();

export const ConversaUpdateManyArgsSchema: z.ZodType<Prisma.ConversaUpdateManyArgs> =
  z
    .object({
      data: z.union([
        ConversaUpdateManyMutationInputSchema,
        ConversaUncheckedUpdateManyInputSchema,
      ]),
      where: ConversaWhereInputSchema.optional(),
      limit: z.number().optional(),
    })
    .strict();

export const ConversaUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.ConversaUpdateManyAndReturnArgs> =
  z
    .object({
      data: z.union([
        ConversaUpdateManyMutationInputSchema,
        ConversaUncheckedUpdateManyInputSchema,
      ]),
      where: ConversaWhereInputSchema.optional(),
      limit: z.number().optional(),
    })
    .strict();

export const ConversaDeleteManyArgsSchema: z.ZodType<Prisma.ConversaDeleteManyArgs> =
  z
    .object({
      where: ConversaWhereInputSchema.optional(),
      limit: z.number().optional(),
    })
    .strict();

export const MensagemCreateArgsSchema: z.ZodType<Prisma.MensagemCreateArgs> = z
  .object({
    select: MensagemSelectSchema.optional(),
    include: MensagemIncludeSchema.optional(),
    data: z.union([
      MensagemCreateInputSchema,
      MensagemUncheckedCreateInputSchema,
    ]),
  })
  .strict();

export const MensagemUpsertArgsSchema: z.ZodType<Prisma.MensagemUpsertArgs> = z
  .object({
    select: MensagemSelectSchema.optional(),
    include: MensagemIncludeSchema.optional(),
    where: MensagemWhereUniqueInputSchema,
    create: z.union([
      MensagemCreateInputSchema,
      MensagemUncheckedCreateInputSchema,
    ]),
    update: z.union([
      MensagemUpdateInputSchema,
      MensagemUncheckedUpdateInputSchema,
    ]),
  })
  .strict();

export const MensagemCreateManyArgsSchema: z.ZodType<Prisma.MensagemCreateManyArgs> =
  z
    .object({
      data: z.union([
        MensagemCreateManyInputSchema,
        MensagemCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const MensagemCreateManyAndReturnArgsSchema: z.ZodType<Prisma.MensagemCreateManyAndReturnArgs> =
  z
    .object({
      data: z.union([
        MensagemCreateManyInputSchema,
        MensagemCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const MensagemDeleteArgsSchema: z.ZodType<Prisma.MensagemDeleteArgs> = z
  .object({
    select: MensagemSelectSchema.optional(),
    include: MensagemIncludeSchema.optional(),
    where: MensagemWhereUniqueInputSchema,
  })
  .strict();

export const MensagemUpdateArgsSchema: z.ZodType<Prisma.MensagemUpdateArgs> = z
  .object({
    select: MensagemSelectSchema.optional(),
    include: MensagemIncludeSchema.optional(),
    data: z.union([
      MensagemUpdateInputSchema,
      MensagemUncheckedUpdateInputSchema,
    ]),
    where: MensagemWhereUniqueInputSchema,
  })
  .strict();

export const MensagemUpdateManyArgsSchema: z.ZodType<Prisma.MensagemUpdateManyArgs> =
  z
    .object({
      data: z.union([
        MensagemUpdateManyMutationInputSchema,
        MensagemUncheckedUpdateManyInputSchema,
      ]),
      where: MensagemWhereInputSchema.optional(),
      limit: z.number().optional(),
    })
    .strict();

export const MensagemUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.MensagemUpdateManyAndReturnArgs> =
  z
    .object({
      data: z.union([
        MensagemUpdateManyMutationInputSchema,
        MensagemUncheckedUpdateManyInputSchema,
      ]),
      where: MensagemWhereInputSchema.optional(),
      limit: z.number().optional(),
    })
    .strict();

export const MensagemDeleteManyArgsSchema: z.ZodType<Prisma.MensagemDeleteManyArgs> =
  z
    .object({
      where: MensagemWhereInputSchema.optional(),
      limit: z.number().optional(),
    })
    .strict();

export const NotificacaoCreateArgsSchema: z.ZodType<Prisma.NotificacaoCreateArgs> =
  z
    .object({
      select: NotificacaoSelectSchema.optional(),
      include: NotificacaoIncludeSchema.optional(),
      data: z.union([
        NotificacaoCreateInputSchema,
        NotificacaoUncheckedCreateInputSchema,
      ]),
    })
    .strict();

export const NotificacaoUpsertArgsSchema: z.ZodType<Prisma.NotificacaoUpsertArgs> =
  z
    .object({
      select: NotificacaoSelectSchema.optional(),
      include: NotificacaoIncludeSchema.optional(),
      where: NotificacaoWhereUniqueInputSchema,
      create: z.union([
        NotificacaoCreateInputSchema,
        NotificacaoUncheckedCreateInputSchema,
      ]),
      update: z.union([
        NotificacaoUpdateInputSchema,
        NotificacaoUncheckedUpdateInputSchema,
      ]),
    })
    .strict();

export const NotificacaoCreateManyArgsSchema: z.ZodType<Prisma.NotificacaoCreateManyArgs> =
  z
    .object({
      data: z.union([
        NotificacaoCreateManyInputSchema,
        NotificacaoCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const NotificacaoCreateManyAndReturnArgsSchema: z.ZodType<Prisma.NotificacaoCreateManyAndReturnArgs> =
  z
    .object({
      data: z.union([
        NotificacaoCreateManyInputSchema,
        NotificacaoCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const NotificacaoDeleteArgsSchema: z.ZodType<Prisma.NotificacaoDeleteArgs> =
  z
    .object({
      select: NotificacaoSelectSchema.optional(),
      include: NotificacaoIncludeSchema.optional(),
      where: NotificacaoWhereUniqueInputSchema,
    })
    .strict();

export const NotificacaoUpdateArgsSchema: z.ZodType<Prisma.NotificacaoUpdateArgs> =
  z
    .object({
      select: NotificacaoSelectSchema.optional(),
      include: NotificacaoIncludeSchema.optional(),
      data: z.union([
        NotificacaoUpdateInputSchema,
        NotificacaoUncheckedUpdateInputSchema,
      ]),
      where: NotificacaoWhereUniqueInputSchema,
    })
    .strict();

export const NotificacaoUpdateManyArgsSchema: z.ZodType<Prisma.NotificacaoUpdateManyArgs> =
  z
    .object({
      data: z.union([
        NotificacaoUpdateManyMutationInputSchema,
        NotificacaoUncheckedUpdateManyInputSchema,
      ]),
      where: NotificacaoWhereInputSchema.optional(),
      limit: z.number().optional(),
    })
    .strict();

export const NotificacaoUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.NotificacaoUpdateManyAndReturnArgs> =
  z
    .object({
      data: z.union([
        NotificacaoUpdateManyMutationInputSchema,
        NotificacaoUncheckedUpdateManyInputSchema,
      ]),
      where: NotificacaoWhereInputSchema.optional(),
      limit: z.number().optional(),
    })
    .strict();

export const NotificacaoDeleteManyArgsSchema: z.ZodType<Prisma.NotificacaoDeleteManyArgs> =
  z
    .object({
      where: NotificacaoWhereInputSchema.optional(),
      limit: z.number().optional(),
    })
    .strict();
