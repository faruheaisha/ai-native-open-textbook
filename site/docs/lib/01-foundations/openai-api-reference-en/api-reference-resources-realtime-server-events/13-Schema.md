---
title: "OpenAI API 参考（字段级）"
sourceId: "01-foundations/openai-api-reference-en"
sourceTitle: "OpenAI API 参考（字段级）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://developers.openai.com/api/reference"
entryUrl: "https://developers.openai.com/api/reference"
sourceRel: "api/reference/resources/realtime/server-events.md"
rawUrl: "/raw/01-foundations/openai-api-reference-en/api/reference/resources/realtime/server-events.md"
sourceSha256: "4595bc318a41e7e43d9ea10eda8ce73d0a7f3740791946b9eeb2fb3cc8bab8a6"
pageSha256: "3a6884257edf1e71a32fbe5300994ad18c595672c460f0e088f236582843b08e"
contentMode: "local-full"
zh: ""
---

### Schema

Schema name: `RealtimeServerEventConversationItemInputAudioTranscriptionCompleted`

```json
{
  "(resource) realtime > (model) conversation_item_input_audio_transcription_completed_event > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/RealtimeServerEventConversationItemInputAudioTranscriptionCompleted",
    "docstring": "This event is the output of audio transcription for user audio written to the\nuser audio buffer. Transcription begins when the input audio buffer is\ncommitted by the client or server (when VAD is enabled). Transcription runs\nasynchronously with Response creation, so this event may come before or after\nthe Response events.\n\nRealtime API models accept audio natively, and thus input transcription is a\nseparate process run on a separate ASR (Automatic Speech Recognition) model.\nThe transcript may diverge somewhat from the model's interpretation, and\nshould be treated as a rough guide.\n",
    "ident": "ConversationItemInputAudioTranscriptionCompletedEvent",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "content_index"
        },
        {
          "ident": "event_id"
        },
        {
          "ident": "item_id"
        },
        {
          "ident": "transcript"
        },
        {
          "ident": "type"
        },
        {
          "ident": "usage"
        },
        {
          "ident": "languages"
        },
        {
          "ident": "logprobs"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) conversation_item_input_audio_transcription_completed_event > (schema) > (property) content_index",
      "(resource) realtime > (model) conversation_item_input_audio_transcription_completed_event > (schema) > (property) event_id",
      "(resource) realtime > (model) conversation_item_input_audio_transcription_completed_event > (schema) > (property) item_id",
      "(resource) realtime > (model) conversation_item_input_audio_transcription_completed_event > (schema) > (property) transcript",
      "(resource) realtime > (model) conversation_item_input_audio_transcription_completed_event > (schema) > (property) type",
      "(resource) realtime > (model) conversation_item_input_audio_transcription_completed_event > (schema) > (property) usage",
      "(resource) realtime > (model) conversation_item_input_audio_transcription_completed_event > (schema) > (property) languages",
      "(resource) realtime > (model) conversation_item_input_audio_transcription_completed_event > (schema) > (property) logprobs"
    ]
  },
  "(resource) realtime > (model) conversation_item_input_audio_transcription_completed_event > (schema) > (property) content_index": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventConversationItemInputAudioTranscriptionCompleted/properties/content_index",
    "deprecated": false,
    "key": "content_index",
    "docstring": "The index of the content part containing the audio.",
    "type": {
      "kind": "HttpTypeNumber"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "integer",
    "children": []
  },
  "(resource) realtime > (model) conversation_item_input_audio_transcription_completed_event > (schema) > (property) event_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventConversationItemInputAudioTranscriptionCompleted/properties/event_id",
    "deprecated": false,
    "key": "event_id",
    "docstring": "The unique ID of the server event.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) conversation_item_input_audio_transcription_completed_event > (schema) > (property) item_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventConversationItemInputAudioTranscriptionCompleted/properties/item_id",
    "deprecated": false,
    "key": "item_id",
    "docstring": "The ID of the item containing the audio that is being transcribed.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) conversation_item_input_audio_transcription_completed_event > (schema) > (property) transcript": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventConversationItemInputAudioTranscriptionCompleted/properties/transcript",
    "deprecated": false,
    "key": "transcript",
    "docstring": "The transcribed text.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) conversation_item_input_audio_transcription_completed_event > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventConversationItemInputAudioTranscriptionCompleted/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The event type, must be\n`conversation.item.input_audio_transcription.completed`.\n",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeServerEventConversationItemInputAudioTranscriptionCompleted/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "conversation.item.input_audio_transcription.completed"
        }
      ]
    },
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) conversation_item_input_audio_transcription_completed_event > (schema) > (property) type > (member) 0"
    ]
  },
  "(resource) realtime > (model) conversation_item_input_audio_transcription_completed_event > (schema) > (property) usage": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventConversationItemInputAudioTranscriptionCompleted/properties/usage",
    "deprecated": false,
    "key": "usage",
    "docstring": "Usage statistics for the transcription, this is billed according to the ASR model's pricing rather than the realtime model's pricing.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeServerEventConversationItemInputAudioTranscriptionCompleted/properties/usage",
      "types": [
        {
          "kind": "HttpTypeObject",
          "members": [
            {
              "ident": "input_tokens"
            },
            {
              "ident": "output_tokens"
            },
            {
              "ident": "total_tokens"
            },
            {
              "ident": "type"
            },
            {
              "ident": "input_token_details"
            }
          ]
        },
        {
          "kind": "HttpTypeObject",
          "members": [
            {
              "ident": "seconds"
            },
            {
              "ident": "type"
            }
          ]
        }
      ]
    },
    "optional": false,
    "nullable": false,
    "schemaType": "union",
    "childrenParentSchema": "union",
    "children": [
      "(resource) realtime > (model) conversation_item_input_audio_transcription_completed_event > (schema) > (property) usage > (variant) 0",
      "(resource) realtime > (model) conversation_item_input_audio_transcription_completed_event > (schema) > (property) usage > (variant) 1"
    ]
  },
  "(resource) realtime > (model) conversation_item_input_audio_transcription_completed_event > (schema) > (property) languages": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventConversationItemInputAudioTranscriptionCompleted/properties/languages",
    "deprecated": false,
    "key": "languages",
    "docstring": "The languages detected in the audio. Returned by `gpt-transcribe`. An empty array indicates that no language could be reliably detected.\n",
    "type": {
      "kind": "HttpTypeArray",
      "oasRef": "#/components/schemas/RealtimeServerEventConversationItemInputAudioTranscriptionCompleted/properties/languages",
      "elementType": {
        "kind": "HttpTypeReference",
        "ident": "TranscriptionLanguage",
        "$ref": "(resource) audio.transcriptions > (model) transcription_language > (schema)"
      }
    },
    "optional": true,
    "nullable": false,
    "schemaType": "array",
    "childrenParentSchema": "object",
    "children": [
      "(resource) audio.transcriptions > (model) transcription_language > (schema) > (property) code"
    ]
  },
  "(resource) realtime > (model) conversation_item_input_audio_transcription_completed_event > (schema) > (property) logprobs": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventConversationItemInputAudioTranscriptionCompleted/properties/logprobs",
    "deprecated": false,
    "key": "logprobs",
    "docstring": "The log probabilities of the transcription.",
    "type": {
      "kind": "HttpTypeArray",
      "oasRef": "#/components/schemas/RealtimeServerEventConversationItemInputAudioTranscriptionCompleted/properties/logprobs",
      "elementType": {
        "kind": "HttpTypeReference",
        "ident": "LogProbProperties",
        "$ref": "(resource) realtime > (model) log_prob_properties > (schema)"
      }
    },
    "optional": true,
    "nullable": true,
    "schemaType": "array",
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) log_prob_properties > (schema) > (property) token",
      "(resource) realtime > (model) log_prob_properties > (schema) > (property) bytes",
      "(resource) realtime > (model) log_prob_properties > (schema) > (property) logprob"
    ]
  },
  "(resource) realtime > (model) conversation_item_input_audio_transcription_completed_event > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "conversation.item.input_audio_transcription.completed"
    }
  },
  "(resource) realtime > (model) conversation_item_input_audio_transcription_completed_event > (schema) > (property) usage > (variant) 0": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/RealtimeServerEventConversationItemInputAudioTranscriptionCompleted/properties/usage/oneOf/0",
    "docstring": "Usage statistics for models billed by token usage.",
    "ident": "Tokens",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "input_tokens"
        },
        {
          "ident": "output_tokens"
        },
        {
          "ident": "total_tokens"
        },
        {
          "ident": "type"
        },
        {
          "ident": "input_token_details"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) conversation_item_input_audio_transcription_completed_event > (schema) > (property) usage > (variant) 0 > (property) input_tokens",
      "(resource) realtime > (model) conversation_item_input_audio_transcription_completed_event > (schema) > (property) usage > (variant) 0 > (property) output_tokens",
      "(resource) realtime > (model) conversation_item_input_audio_transcription_completed_event > (schema) > (property) usage > (variant) 0 > (property) total_tokens",
      "(resource) realtime > (model) conversation_item_input_audio_transcription_completed_event > (schema) > (property) usage > (variant) 0 > (property) type",
      "(resource) realtime > (model) conversation_item_input_audio_transcription_completed_event > (schema) > (property) usage > (variant) 0 > (property) input_token_details"
    ]
  },
  "(resource) realtime > (model) conversation_item_input_audio_transcription_completed_event > (schema) > (property) usage > (variant) 1": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/RealtimeServerEventConversationItemInputAudioTranscriptionCompleted/properties/usage/oneOf/1",
    "docstring": "Usage statistics for models billed by audio input duration.",
    "ident": "Duration",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "seconds"
        },
        {
          "ident": "type"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) conversation_item_input_audio_transcription_completed_event > (schema) > (property) usage > (variant) 1 > (property) seconds",
      "(resource) realtime > (model) conversation_item_input_audio_transcription_completed_event > (schema) > (property) usage > (variant) 1 > (property) type"
    ]
  },
  "(resource) audio.transcriptions > (model) transcription_language > (schema) > (property) code": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/TranscriptionLanguage/properties/code",
    "deprecated": false,
    "key": "code",
    "docstring": "The code of a language detected in the audio.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) audio.transcriptions > (model) transcription_language > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/TranscriptionLanguage",
    "docstring": "A language detected in transcribed audio.",
    "ident": "TranscriptionLanguage",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "code"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) audio.transcriptions > (model) transcription_language > (schema) > (property) code"
    ]
  },
  "(resource) realtime > (model) log_prob_properties > (schema) > (property) token": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LogProbProperties/properties/token",
    "deprecated": false,
    "key": "token",
    "docstring": "The token that was used to generate the log probability.\n",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) log_prob_properties > (schema) > (property) bytes": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LogProbProperties/properties/bytes",
    "deprecated": false,
    "key": "bytes",
    "docstring": "The bytes that were used to generate the log probability.\n",
    "type": {
      "kind": "HttpTypeArray",
      "oasRef": "#/components/schemas/LogProbProperties/properties/bytes",
      "elementType": {
        "kind": "HttpTypeNumber"
      }
    },
    "optional": false,
    "nullable": false,
    "schemaType": "array",
    "children": []
  },
  "(resource) realtime > (model) log_prob_properties > (schema) > (property) logprob": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LogProbProperties/properties/logprob",
    "deprecated": false,
    "key": "logprob",
    "docstring": "The log probability of the token.\n",
    "type": {
      "kind": "HttpTypeNumber"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "number",
    "children": []
  },
  "(resource) realtime > (model) log_prob_properties > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/LogProbProperties",
    "docstring": "A log probability object.\n",
    "ident": "LogProbProperties",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "token"
        },
        {
          "ident": "bytes"
        },
        {
          "ident": "logprob"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) log_prob_properties > (schema) > (property) token",
      "(resource) realtime > (model) log_prob_properties > (schema) > (property) bytes",
      "(resource) realtime > (model) log_prob_properties > (schema) > (property) logprob"
    ]
  },
  "(resource) realtime > (model) conversation_item_input_audio_transcription_completed_event > (schema) > (property) usage > (variant) 0 > (property) input_tokens": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/TranscriptTextUsageTokens/properties/input_tokens",
    "deprecated": false,
    "key": "input_tokens",
    "docstring": "Number of input tokens billed for this request.",
    "type": {
      "kind": "HttpTypeNumber"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "integer",
    "children": []
  },
  "(resource) realtime > (model) conversation_item_input_audio_transcription_completed_event > (schema) > (property) usage > (variant) 0 > (property) output_tokens": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/TranscriptTextUsageTokens/properties/output_tokens",
    "deprecated": false,
    "key": "output_tokens",
    "docstring": "Number of output tokens generated.",
    "type": {
      "kind": "HttpTypeNumber"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "integer",
    "children": []
  },
  "(resource) realtime > (model) conversation_item_input_audio_transcription_completed_event > (schema) > (property) usage > (variant) 0 > (property) total_tokens": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/TranscriptTextUsageTokens/properties/total_tokens",
    "deprecated": false,
    "key": "total_tokens",
    "docstring": "Total number of tokens used (input + output).",
    "type": {
      "kind": "HttpTypeNumber"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "integer",
    "children": []
  },
  "(resource) realtime > (model) conversation_item_input_audio_transcription_completed_event > (schema) > (property) usage > (variant) 0 > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/TranscriptTextUsageTokens/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The type of the usage object. Always `tokens` for this variant.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/TranscriptTextUsageTokens/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "tokens"
        }
      ]
    },
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) conversation_item_input_audio_transcription_completed_event > (schema) > (property) usage > (variant) 0 > (property) type > (member) 0"
    ]
  },
  "(resource) realtime > (model) conversation_item_input_audio_transcription_completed_event > (schema) > (property) usage > (variant) 0 > (property) input_token_details": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/TranscriptTextUsageTokens/properties/input_token_details",
    "deprecated": false,
    "key": "input_token_details",
    "docstring": "Details about the input tokens billed for this request.",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "audio_tokens"
        },
        {
          "ident": "text_tokens"
        }
      ]
    },
    "optional": true,
    "nullable": false,
    "schemaType": "object",
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) conversation_item_input_audio_transcription_completed_event > (schema) > (property) usage > (variant) 0 > (property) input_token_details > (property) audio_tokens",
      "(resource) realtime > (model) conversation_item_input_audio_transcription_completed_event > (schema) > (property) usage > (variant) 0 > (property) input_token_details > (property) text_tokens"
    ]
  },
  "(resource) realtime > (model) conversation_item_input_audio_transcription_completed_event > (schema) > (property) usage > (variant) 1 > (property) seconds": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/TranscriptTextUsageDuration/properties/seconds",
    "deprecated": false,
    "key": "seconds",
    "docstring": "Duration of the input audio in seconds.",
    "type": {
      "kind": "HttpTypeNumber"
    },
    "constraints": {
      "format": "double"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "number",
    "children": []
  },
  "(resource) realtime > (model) conversation_item_input_audio_transcription_completed_event > (schema) > (property) usage > (variant) 1 > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/TranscriptTextUsageDuration/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The type of the usage object. Always `duration` for this variant.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/TranscriptTextUsageDuration/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "duration"
        }
      ]
    },
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) conversation_item_input_audio_transcription_completed_event > (schema) > (property) usage > (variant) 1 > (property) type > (member) 0"
    ]
  },
  "(resource) realtime > (model) conversation_item_input_audio_transcription_completed_event > (schema) > (property) usage > (variant) 0 > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "tokens"
    }
  },
  "(resource) realtime > (model) conversation_item_input_audio_transcription_completed_event > (schema) > (property) usage > (variant) 0 > (property) input_token_details > (property) audio_tokens": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/TranscriptTextUsageTokens/properties/input_token_details/properties/audio_tokens",
    "deprecated": false,
    "key": "audio_tokens",
    "docstring": "Number of audio tokens billed for this request.",
    "type": {
      "kind": "HttpTypeNumber"
    },
    "optional": true,
    "nullable": false,
    "schemaType": "integer",
    "children": []
  },
  "(resource) realtime > (model) conversation_item_input_audio_transcription_completed_event > (schema) > (property) usage > (variant) 0 > (property) input_token_details > (property) text_tokens": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/TranscriptTextUsageTokens/properties/input_token_details/properties/text_tokens",
    "deprecated": false,
    "key": "text_tokens",
    "docstring": "Number of text tokens billed for this request.",
    "type": {
      "kind": "HttpTypeNumber"
    },
    "optional": true,
    "nullable": false,
    "schemaType": "integer",
    "children": []
  },
  "(resource) realtime > (model) conversation_item_input_audio_transcription_completed_event > (schema) > (property) usage > (variant) 1 > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "duration"
    }
  }
}
```
