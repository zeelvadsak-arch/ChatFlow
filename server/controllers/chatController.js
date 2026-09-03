import { Message } from '../models/Message.js';

export const getMessages = async (req, res) => {
  try {
    const { chatId } = req.params;
    const messages = await Message.find({
      $or: [{ recipient: chatId }, { group: chatId }, { sender: chatId }]
    })
      .populate('sender', 'name avatar username')
      .populate('replyTo');

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { recipientId, groupId, text, attachments, voiceUrl, replyToId } = req.body;

    const message = await Message.create({
      sender: req.user._id,
      recipient: recipientId || null,
      group: groupId || null,
      text,
      attachments,
      voiceUrl,
      replyTo: replyToId || null,
      status: 'sent'
    });

    const populatedMsg = await Message.findById(message._id)
      .populate('sender', 'name avatar username')
      .populate('replyTo');

    res.status(201).json(populatedMsg);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
