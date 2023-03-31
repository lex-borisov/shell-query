import prompts from "prompts";
import { getChoices } from "../../helpers";
import {
  ConfigType,
  PromptAnswer,
  PromptChoice,
} from "../../types/configuration";

export default async function deleteConfig(type?: ConfigType) {
  if (type != null) {
    return;
  }

  const configTypes: ConfigType[] = ["default", "browser", "profile"];
  const choices: PromptChoice[] = getChoices(configTypes);

  const { answer: configType }: PromptAnswer<string> = await prompts({
    name: "answer",
    type: "select",
    choices,
    message: "What config do you want to delete?\n",
    instructions: false,
    hint: "- Space/←/→ to toggle selection. Enter to submit.",
  });

  console.log(configType);
}