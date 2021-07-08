const mongoose = require('mongoose')

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Please add a course title'],
  },
  titleEng: {
    type: String,
  },
  picture: {
    type: String,
    default: 'no-photo.jpg',
  },
  mbaFormat: {
    type: String,
    // required: [true, 'Please specify format of course: online or blended'],
    enum: ['online', 'blended'],
  },
  mbaTypeOfProgram: {
    type: String,
    // required: [
    //   true,
    //   'Please specify type of course: "mini mba", "professional mba" or "industry mba" ',
    // ],
    enum: ['mini', 'professional', 'industry', 'profession'],
  },
  goalsOfProgram: {
    type: String,
    // required: [true, 'Please add a description'],
  },
  whatWillYouLearn: {
    type: [String],
    // required: [true, 'Please add whatWillYouLearn'],
  },
  specializedSubjects: {
    type: [String],
    default: undefined
    // required: [true, 'Please add whatWillYouLearn'],
  },
  description: {
    type: String
  },
  suitsForTitle: {
    type: [String],
    default: undefined
  },
  suitsForDesc: {
    type: [String],
    default: undefined
  },
  showInMenu: {
    type: Boolean,
    default: true,
  },

  // level: {
  //   type: String,
  //   required: [true, 'Please add level'],
  //   enum: ['Специалитет', 'Магистратура', 'Бакалавриат', 'MBA', 'ИПО'],
  // },
  // price: {
  //   type: String,
  //   required: [true, 'Please add price'],
  // },
  // priceDisc: {
  //   type: String,
  //   required: [true, 'Please add priceDisc'],
  // },
  // priceGroup: {
  //   type: String,
  //   required: [true, 'Please add priceDisc'],
  //   enum: ['test', 'test2'],
  // },
  // trainingPeriodFrom: {
  //   type: String,
  //   required: [true, 'Please add trainingPeriod'],
  // },
  // trainingPeriodTo: {
  //   type: String,
  //   required: [true, 'Please add trainingPeriod'],
  // },
  url: {
    type: String,
    required: [true, 'Please add url'],
  },
  // uniqueUrl: {
  //   type: String,
  //   unique: true,
  // },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  bootcamp: {
    type: mongoose.Schema.ObjectId,
    ref: 'Bootcamp',
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
})

// Static method to get avg of course tuitions
CourseSchema.statics.getAverageCost = async function (bootcampId) {
  const obj = await this.aggregate([
    {
      $match: { bootcamp: bootcampId },
    },
    {
      $group: {
        _id: '$bootcamp',
        averageCost: { $avg: '$tuition' },
      },
    },
  ])

  try {
    await this.model('Bootcamp').findByIdAndUpdate(bootcampId, {
      averageCost: Math.ceil(obj[0].averageCost / 10) * 10,
    })
  } catch (err) {
    console.error(err)
  }
}

// Call getAverageCost after save
CourseSchema.post('save', function () {
  this.constructor.getAverageCost(this.bootcamp)
})

// Call getAverageCost before remove
CourseSchema.pre('remove', function () {
  this.constructor.getAverageCost(this.bootcamp)
})

module.exports = mongoose.model('Course', CourseSchema)
