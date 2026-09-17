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
pageSha256: "e8be796007c9353fa9c940fc43657c214a2388fa74b001e0dd85a73cf7c7fda5"
contentMode: "local-full"
zh: ""
---

### Schema

Schema name: `RealtimeServerEventConversationItemInputAudioTranscriptionDelta`

```json
{
  "(resource) realtime > (model) conversation_item_input_audio_transcription_delta_event > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/RealtimeServerEventConversationItemInputAudioTranscriptionDelta",
    "docstring": "Returned when the text value of an input audio transcription content part is updated with incremental transcription results.\n",
    "ident": "ConversationItemInputAudioTranscriptionDeltaEvent",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "event_id"
        },
        {
          "ident": "item_id"
        },
        {
          "ident": "type"
        },
        {
          "ident": "content_index"
        },
        {
          "ident": "delta"
        },
        {
          "ident": "logprobs"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) conversation_item_input_audio_transcription_delta_event > (schema) > (property) event_id",
      "(resource) realtime > (model) conversation_item_input_audio_transcription_delta_event > (schema) > (property) item_id",
      "(resource) realtime > (model) conversation_item_input_audio_transcription_delta_event > (schema) > (property) type",
      "(resource) realtime > (model) conversation_item_input_audio_transcription_delta_event > (schema) > (property) content_index",
      "(resource) realtime > (model) conversation_item_input_audio_transcription_delta_event > (schema) > (property) delta",
      "(resource) realtime > (model) conversation_item_input_audio_transcription_delta_event > (schema) > (property) logprobs"
    ]
  },
  "(resource) realtime > (model) conversation_item_input_audio_transcription_delta_event > (schema) > (property) event_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventConversationItemInputAudioTranscriptionDelta/properties/event_id",
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
  "(resource) realtime > (model) conversation_item_input_audio_transcription_delta_event > (schema) > (property) item_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventConversationItemInputAudioTranscriptionDelta/properties/item_id",
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
  "(resource) realtime > (model) conversation_item_input_audio_transcription_delta_event > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventConversationItemInputAudioTranscriptionDelta/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The event type, must be `conversation.item.input_audio_transcription.delta`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeServerEventConversationItemInputAudioTranscriptionDelta/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "conversation.item.input_audio_transcription.delta"
        }
      ]
    },
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) conversation_item_input_audio_transcription_delta_event > (schema) > (property) type > (member) 0"
    ]
  },
  "(resource) realtime > (model) conversation_item_input_audio_transcription_delta_event > (schema) > (property) content_index": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventConversationItemInputAudioTranscriptionDelta/properties/content_index",
    "deprecated": false,
    "key": "content_index",
    "docstring": "The index of the content part in the item's content array.",
    "type": {
      "kind": "HttpTypeNumber"
    },
    "optional": true,
    "nullable": false,
    "schemaType": "integer",
    "children": []
  },
  "(resource) realtime > (model) conversation_item_input_audio_transcription_delta_event > (schema) > (property) delta": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventConversationItemInputAudioTranscriptionDelta/properties/delta",
    "deprecated": false,
    "key": "delta",
    "docstring": "The text delta.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": true,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) conversation_item_input_audio_transcription_delta_event > (schema) > (property) logprobs": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventConversationItemInputAudioTranscriptionDelta/properties/logprobs",
    "deprecated": false,
    "key": "logprobs",
    "docstring": "The log probabilities of the transcription. These can be enabled by configurating the session with `\"include\": [\"item.input_audio_transcription.logprobs\"]`. Each entry in the array corresponds a log probability of which token would be selected for this chunk of transcription. This can help to identify if it was possible there were multiple valid options for a given chunk of transcription.",
    "type": {
      "kind": "HttpTypeArray",
      "oasRef": "#/components/schemas/RealtimeServerEventConversationItemInputAudioTranscriptionDelta/properties/logprobs",
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
  "(resource) realtime > (model) conversation_item_input_audio_transcription_delta_event > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "conversation.item.input_audio_transcription.delta"
    }
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
  }
}
```
