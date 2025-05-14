 
 export const questions = [
      {
         text: "What best describes your skin texture?", 
         order: 1 ,
         answers: ['Oily','Dry','Normal','Combination']

      },

      {
         text: "Are you sure your skin texture is similar to this picture?",
         order: 2,
         isConfirmation: true ,
         answers: ['Sure', 'Cancel']
      },

      { 
        text: "How sensitive is your skin?",
        order: 3 ,
        answers:['Not sensitive','Very sensitive','Slightly sensitive']
      },

      { 
        text: "What environmental factors are you exposed to daily?",
         order: 4, 
         isMultiChoice: true ,
         answers:['Indoor environments','Pollution','Sun']
      },

      { 
        text: "What are your main skin concerns?",
         order: 5,
          isMultiChoice: true ,
          answers:['Dryness','Redness','Dullness','Pigmentation','Wrinkles','Acne']
      },

      {
         text: "Finally, are you sure about all the information you have entered?",
          order: 6, 
          isConfirmation: true ,
          answers: ['No, let me review','Yes, confirm']
      }
    ]
 export default questions