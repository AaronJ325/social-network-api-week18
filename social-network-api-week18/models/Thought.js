const { Schema, model } = require('mongoose');
const formatCreationDate = require('../utils/formatCreationDate');

const ReactionSchema = new Schema(
    {
        reactionId: {
          type: Schema.Types.ObjectId,
          default: () => new Types.ObjectId()
        },
        reactionBody: {
          type: String,
          required: true,
          maxlength: 280
        },
        username: {
          type: String,
          required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtTime => formatCreationDate(createdAtTime)
        }
      },
      {
        toJSON: {
          getters: true
        }
      }
)

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtTime => formatCreationDate(createdAtTime)
        },
        username: {
            type: String,
            required: true,
        },
        // bring in ReactionSchema
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

// get length of reactions array
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
})

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;